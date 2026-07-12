"""Safe live frontend bundle checks. No secrets."""
from __future__ import annotations

import re
import urllib.request

FE = "https://thyrot1.chinthakajayaweera1.workers.dev"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "ThyroCare-Smoke/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", "ignore")


def main() -> None:
    html = fetch(f"{FE}/")
    match = re.search(r"/assets/index-[^\"]+\.js", html)
    print("asset", match.group(0) if match else None)
    if not match:
        raise SystemExit(1)
    bundle = fetch(f"{FE}{match.group(0)}")
    api = re.search(r'VITE_API_BASE_URL:"([^"]+)"', bundle)
    env = re.search(r'VITE_APP_ENV:"([^"]+)"', bundle)
    name = re.search(r'VITE_APP_NAME:"([^"]+)"', bundle)
    print("VITE_API_BASE_URL", api.group(1) if api else "NOT_FOUND")
    print("VITE_APP_ENV", env.group(1) if env else "NOT_FOUND")
    print("VITE_APP_NAME", name.group(1) if name else "NOT_FOUND")
    print("has_render", "thyro-t1.onrender.com" in bundle)
    print("localhost_8000_present", "localhost:8000" in bundle)
    print("active_apiBaseUrl_localhost", 'apiBaseUrl:"http://localhost:8000' in bundle)


if __name__ == "__main__":
    main()
