<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$config = require __DIR__ . '/config.php';

function db(): PDO {
    static $pdo = null;
    global $config;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['host'], $config['database']);
    $pdo = new PDO($dsn, $config['user'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    return $pdo;
}

function json_input(): array {
    $raw = file_get_contents('php://input') ?: '{}';
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function fail(string $message, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

function ok(array $payload): void {
    echo json_encode($payload);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (str_ends_with($path, '/status') && $method === 'GET') {
    $counts = [
        'users' => (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn(),
        'phones' => (int) db()->query('SELECT COUNT(*) FROM phones_catalog')->fetchColumn(),
        'favorites' => (int) db()->query('SELECT COUNT(*) FROM user_favorites')->fetchColumn(),
        'reviews' => (int) db()->query('SELECT COUNT(*) FROM user_reviews')->fetchColumn(),
    ];
    ok(['database' => 'connected', 'counts' => $counts]);
}

if (str_ends_with($path, '/auth/register') && $method === 'POST') {
    $in = json_input();
    $email = strtolower(trim((string) ($in['email'] ?? '')));
    $password = (string) ($in['password'] ?? '');
    $name = trim((string) ($in['displayName'] ?? ''));
    if ($email === '' || $password === '') {
        fail('Email and password are required.');
    }
    $id = bin2hex(random_bytes(16));
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = db()->prepare('INSERT INTO users (id, email, password_hash, display_name, bio, avatar_url, website_url, role) VALUES (?,?,?,?,?,?,?,?)');
    try {
        $stmt->execute([$id, $email, $hash, $name !== '' ? $name : explode('@', $email)[0], '', '', '', 'member']);
    } catch (PDOException) {
        fail('An account already exists for this email.');
    }
    ok(['id' => $id, 'email' => $email, 'displayName' => $name, 'role' => 'member', 'favorites' => []]);
}

if (str_ends_with($path, '/auth/login') && $method === 'POST') {
    $in = json_input();
    $email = strtolower(trim((string) ($in['email'] ?? '')));
    $password = (string) ($in['password'] ?? '');
    $stmt = db()->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row || !password_verify($password, $row['password_hash'])) {
        fail('Email or password does not match.', 401);
    }
    $fav = db()->prepare('SELECT device_id FROM user_favorites WHERE user_id = ?');
    $fav->execute([$row['id']]);
    ok([
        'id' => $row['id'],
        'email' => $row['email'],
        'displayName' => $row['display_name'],
        'bio' => $row['bio'],
        'avatarUrl' => $row['avatar_url'],
        'websiteUrl' => $row['website_url'],
        'role' => $row['role'],
        'favorites' => $fav->fetchAll(PDO::FETCH_COLUMN),
    ]);
}

fail('Not found', 404);
