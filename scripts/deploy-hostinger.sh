#!/usr/bin/env bash
# Upload dist/ into Hostinger public_html.
# Required env: HOSTINGER_FTP_USER, HOSTINGER_FTP_PASSWORD
# Optional: HOSTINGER_FTP_HOST (default ftp.mobilespecific.com)
#           HOSTINGER_FTP_PORT (default 21)
#           HOSTINGER_FTP_DIR  (default /public_html/)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

if [[ ! -f "$DIST/index.html" ]]; then
  echo "dist/index.html missing. Run npm run build first." >&2
  exit 1
fi

if [[ -z "${HOSTINGER_FTP_USER:-}" || -z "${HOSTINGER_FTP_PASSWORD:-}" ]]; then
  echo "Set HOSTINGER_FTP_USER and HOSTINGER_FTP_PASSWORD (from hPanel → FTP Accounts)." >&2
  echo "Do not use the Hostinger login email as the FTP username." >&2
  exit 1
fi

HOST="${HOSTINGER_FTP_HOST:-ftp.mobilespecific.com}"
PORT="${HOSTINGER_FTP_PORT:-21}"
REMOTE="${HOSTINGER_FTP_DIR:-/public_html/}"
USER="$HOSTINGER_FTP_USER"
PASS="$HOSTINGER_FTP_PASSWORD"

echo "Uploading $DIST → $USER@$HOST:$PORT$REMOTE"

if [[ "$PORT" == "65002" || "${HOSTINGER_FTP_PROTOCOL:-}" == "sftp" ]]; then
  lftp -u "$USER,$PASS" "sftp://$HOST:$PORT" -e "
    set sftp:auto-confirm yes;
    set ssl:verify-certificate no;
    mirror --reverse --delete --verbose --exclude-glob .git/ $DIST $REMOTE;
    bye
  "
else
  lftp -u "$USER,$PASS" "ftp://$HOST:$PORT" -e "
    set ftp:ssl-allow true;
    set ftp:ssl-force false;
    set ssl:verify-certificate no;
    set ftp:passive-mode true;
    mirror --reverse --delete --verbose --exclude-glob .git/ $DIST $REMOTE;
    bye
  "
fi

echo "Upload finished. Check https://mobilespecific.com/version.json and purge hCDN if the old bundle remains."
