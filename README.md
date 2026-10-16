# Website Golden Hour Golf

De website van Golden Hour Golf: een marketingpagina plus de verplichte privacy- en supportpagina's voor de App Store.
Gewone HTML, CSS en een beetje JavaScript, zonder build-stap. Je kunt elk bestand openen en direct aanpassen.

- Live: https://ai-adviesbureau.github.io/golden-hour-golf/
- Support (App Store "Support URL"): https://ai-adviesbureau.github.io/golden-hour-golf/support.html
- Privacy (App Store "Privacy Policy URL"): https://ai-adviesbureau.github.io/golden-hour-golf/privacy.html
- Publieke repository (alleen de websitebestanden): https://github.com/AI-Adviesbureau/golden-hour-golf

De bron staat in de game-repository in `website/`. De publieke repository is een kopie daarvan; het spel zelf staat nergens online.

## Wat is wat

| Bestand | Inhoud |
|---|---|
| `index.html` | Marketingpagina (Engels in de HTML, Nederlands via de EN/NL-knop; de teksten staan in `assets/js/site.js`, blok `NL`) |
| `privacy.html`, `privacy-nl.html` | Privacyverklaring, Engels en Nederlands |
| `support.html`, `support-nl.html` | Contact en veelgestelde vragen, Engels en Nederlands |
| `404.html` | "Out of bounds"-pagina voor adressen die niet bestaan |
| `assets/css/site.css` | Alle opmaak (kleuren bovenin bij `:root`) |
| `assets/js/site.js` | Taalwissel, App Store-knop, video's, screenshotgalerij |
| `assets/fonts/` | Big Shoulders Display en Manrope (SIL Open Font License, zie `OFL.txt`), zelf gehost, alleen Latijnse tekens |
| `assets/img/`, `assets/shots/en|nl/` | Beelden uit het spel (WebP), app-icoon, deelafbeelding `og-image.jpg` (1200 × 630) |
| `assets/video/` | Achtergrondvideo (hole 4, drive) en de staande hole-in-one-clip |
| `check_site.py` | Controleert links, beelden, HTML en de totale grootte |

## De App Store-knop omzetten

Bovenin `assets/js/site.js` staat:

```js
var SITE = {
  store: "soon",
  appStoreUrl: "https://apps.apple.com/app/id6820908266",
  betaUrl: ""
};
```

- `"soon"`: "Coming soon to the App Store" (geen link). Zo staat het nu.
- `"beta"`: "Join the beta on TestFlight". Zet dan ook de openbare TestFlight-link in `betaUrl`.
- `"live"`: "Download on the App Store", met een link naar de app. Zet dit pas om als de app echt in de App Store staat.

De knop is een eigen knop in de stijl van de site, zonder Apple-logo of officiële badge-afbeelding. Wil je liever de
officiële badge van Apple: download hem zelf via https://developer.apple.com/app-store/marketing/guidelines/ (Apple Marketing Tools),
ongewijzigd, en gebruik hem pas als de app live is. Apple wil dat de badge alleen naar de echte App Store-pagina linkt.

## Aanpassen en publiceren

1. Pas de bestanden in `website/` aan en bekijk ze lokaal: `cd website && python3 -m http.server 8000`, open http://localhost:8000.
2. Controleer: `python3 website/check_site.py`.
3. Commit in de game-repository (alleen `website/`).
4. Publiceer: `tools/website/publish.sh "Korte omschrijving"`. Het script draait de controle, kopieert `website/` naar de
   publieke repository en pusht. GitHub Pages is meestal binnen een minuut bijgewerkt.

Nieuwe screenshots of beelden: zet ze als WebP in `assets/` (breedte 1600 en 800 px, kwaliteit ongeveer 78) en houd de
hele site onder 25 MB. Video's: H.264 zonder geluid, `-movflags +faststart`, liefst onder 4 MB.

## Later een eigen domein (bijvoorbeeld goldenhourgolf.nl of golf.ai-adviesbureau.nl)

GitHub Pages werkt met een eigen domein, gratis en met https.

**Subdomein, bijvoorbeeld `golf.ai-adviesbureau.nl`** (het eenvoudigst):
1. Maak bij je DNS-beheerder een **CNAME**-record: naam `golf`, waarde `ai-adviesbureau.github.io` (met of zonder punt aan het eind, afhankelijk van je beheerder).
2. Zet in `website/` een bestand `CNAME` met precies één regel: `golf.ai-adviesbureau.nl`. Publiceer.
3. Op GitHub: repository `golden-hour-golf` → Settings → Pages → Custom domain: `golf.ai-adviesbureau.nl` → Save. Wacht tot de DNS-check groen is en zet **Enforce HTTPS** aan.

**Eigen domein, bijvoorbeeld `goldenhourgolf.nl`**:
1. Registreer het domein. Maak voor `goldenhourgolf.nl` zelf vier **A**-records naar `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153` en `185.199.111.153` (en eventueel AAAA-records naar `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
2. Maak een **CNAME** voor `www` naar `ai-adviesbureau.github.io`.
3. Zet in `website/CNAME`: `goldenhourgolf.nl`. Publiceer en vul het domein in bij Settings → Pages, net als hierboven.
4. Tip: verifieer het domein ook bij GitHub (profiel → Settings → Pages → Add a domain) zodat niemand anders het kan claimen.

Na de overstap:
- Vervang in alle HTML-bestanden, `sitemap.xml` en `robots.txt` het adres `https://ai-adviesbureau.github.io/golden-hour-golf/` door het nieuwe adres.
- In `404.html` staan links die beginnen met `/golden-hour-golf/`; maak daar `/` van. (Pas daarna ook `BASE` in `check_site.py` aan.)
- Pas de URL's aan in `tools/appstore/store.json` en push de metadata opnieuw. Het oude github.io-adres stuurt GitHub automatisch door.

## Licenties

- Lettertypes: Big Shoulders Display en Manrope, SIL Open Font License 1.1 (`assets/fonts/OFL.txt`). Hier als subset in WOFF-formaat.
- Beelden en video's: opnames uit Golden Hour Golf, © AI Adviesbureau B.V.
- Apple, iPhone, App Store, Game Center en TestFlight zijn handelsmerken van Apple Inc. De site gebruikt de namen alleen beschrijvend.
