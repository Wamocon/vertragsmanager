# Vertragsmanager â€” Implementierungsfortschritt V1

**Stand:** 2025-07-15  
**Status:** V1 Kernfunktionen implementiert â€” bereit zum manuellen Testen

---

## Zusammenfassung

Alle V1-Module aus dem Anforderungsdokument (Abschnitt 7) wurden als funktionsfÃ¤hige Next.js-Seiten implementiert. Die App nutzt eine lokale Supabase-Instanz (Docker) mit vollstÃ¤ndigem Datenbankschema, RLS-Policies und realistischen Testdaten.

---

## Technologie-Stack

| Komponente | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.1 |
| Sprache | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS | v4 |
| Backend/DB | Supabase (lokal, Docker) | CLI 2.91.2 |
| i18n | next-intl | DE + EN |
| Icons | lucide-react | â€” |
| Charts | recharts | â€” |
| Datumsberechnung | date-fns | â€” |

---

## Lokale Supabase-Konfiguration

Die lokale Instanz lÃ¤uft auf eigenen Ports, um Konflikte mit anderen Supabase-Projekten zu vermeiden:

| Service | Port |
|---|---|
| API (PostgREST) | 54351 |
| PostgreSQL | 54352 |
| Studio | 54353 |
| Inbucket (E-Mail) | 54354 |
| Analytics | 54357 |
| Inspector | 8093 |

**Zugang:**
- Studio: http://127.0.0.1:54353
- Inbucket (E-Mail): http://127.0.0.1:54354
- API: http://127.0.0.1:54351

---

## Implementierte Module (V1)

### âœ… Vertragsverwaltung (VE-01 bis VE-09)
- VertragsÃ¼bersicht mit Karten- und Listenansicht
- Suche nach Name, Anbieter, Kategorie
- Filter nach Kategorie und Status
- Sortierung (Name, Kosten, Frist, Anbieter)
- Vertragsdetailseite mit allen Feldern
- Vertrag erstellen, bearbeiten, lÃ¶schen
- Erinnerungen pro Vertrag aktivieren/deaktivieren
- **Seiten:** `/contracts`, `/contracts/new`, `/contracts/[id]`

### âœ… Dashboard & Analytik (NV-02, KO-01 bis KO-08)
- KPI-Karten: GesamtvertrÃ¤ge, Monats-/Jahreskosten, anstehende Fristen
- Kosten nach Kategorie (PieChart)
- Top-Anbieter (Balkendiagramm)
- Zahlungskalender (12 Monate)
- CSV-Export der Analysedaten
- **Seiten:** `/dashboard`, `/analytics`

### âœ… Fristen & Erinnerungen (FR-01 bis FR-08)
- Fristenliste gruppiert nach Dringlichkeit (Ã¼berfÃ¤llig/diese Woche/dieser Monat/spÃ¤ter)
- Tage bis Frist berechnet und angezeigt
- .ics Kalender-Export fÃ¼r einzelne Fristen
- Farbcodierung nach Dringlichkeit
- **Seite:** `/deadlines`

### âœ… KÃ¼ndigungsvorlagen (KV-01 bis KV-06)
- 4 Vorlagentypen: Ordentliche KÃ¼ndigung, SonderkÃ¼ndigung, NichtverlÃ¤ngerung, AuÃŸerordentliche KÃ¼ndigung
- Vertrag auswÃ¤hlen â†’ Vorlage wird automatisch befÃ¼llt
- Download als Textdatei
- Rechtlicher Hinweis zu juristischer Beratung
- **Seite:** `/templates`

### âœ… Benachrichtigungen (FR-05, BN-01, BN-02)
- In-App-Benachrichtigungszentrale
- Einzeln als gelesen markieren
- Alle als gelesen markieren
- Unread-Badge in Sidebar
- **Seite:** `/notifications`

### âœ… Profil & Datenschutz (PR-01, PR-02, DS-01 bis DS-05)
- Profilbearbeitung (Name, Firma)
- DSGVO-Datenexport (JSON)
- **Seite:** `/profile`

### âœ… Einstellungen (NV-03, SP-01)
- Theme-Umschaltung: Hell / Dunkel / System
- Sprachanzeige
- **Seite:** `/settings`

### âœ… Organisationsverwaltung (OV-01 bis OV-04)
- Mitgliederliste mit Rollen (Admin/Member/Viewer)
- Mitglieder per E-Mail einladen
- Rollen Ã¤ndern
- Mitglieder entfernen
- Ausstehende Einladungen anzeigen
- Audit-Log (letzte Aktionen)
- **Seite:** `/organization`

### âœ… Authentifizierung (AU-01 bis AU-04)
- Login mit E-Mail/Passwort (Supabase Auth)
- Registrierung mit automatischer Demo-Daten-Erstellung
- Middleware-basierter Routenschutz
- Logout Ã¼ber Sidebar
- **Seiten:** `/login`, `/register`

### âœ… Rechtliche Seiten (RE-01)
- Impressum (WAMOCON GmbH)
- DatenschutzerklÃ¤rung (DSGVO-konform)
- AGB
- **Seiten:** `/legal/imprint`, `/legal/privacy`, `/legal/terms`

### âœ… Landingpage
- Hero-Section mit CTA
- Feature-Grid (6 Features)
- Preistabelle (4 Stufen: Free/Starter/Pro/Business)
- Footer mit rechtlichen Links
- **Seite:** `/`

---

## Datenbankschema

### Tabellen (9)
| Tabelle | Zweck |
|---|---|
| `organizations` | Organisationen (Multi-Tenant) |
| `organization_members` | Mitglieder mit Rollen |
| `profiles` | Benutzerprofile (via Trigger bei Registrierung) |
| `categories` | Vertragskategorien (7 System-Kategorien) |
| `contracts` | VertrÃ¤ge mit allen V1-Feldern |
| `reminders` | Erinnerungen pro Vertrag |
| `notifications` | In-App-Benachrichtigungen |
| `invitations` | E-Mail-Einladungen |
| `audit_log` | Aktionsprotokoll |

### RLS-Policies
Alle Tabellen haben Row-Level-Security aktiviert. Zugriff ist auf die eigene Organisation beschrÃ¤nkt.

### Trigger
- `handle_new_user`: Erstellt automatisch ein Profil bei Registrierung
- `compute_cancellation_deadline`: Berechnet KÃ¼ndigungsfrist bei VertragsÃ¤nderung
- `auto_update_contract_status`: Aktualisiert Vertragsstatus basierend auf Enddatum
- `create_default_reminders`: Erstellt Standard-Erinnerungen bei neuem Vertrag

### Seed-Daten
Die Funktion `setup_demo_data(user_id, org_name)` wird bei der Registrierung aufgerufen und erstellt:
- 1 Organisation mit dem Benutzer als Admin
- 7 System-Kategorien (Software, Cloud, Telekommunikation, Versicherung, Immobilien, Fahrzeuge, Marketing)
- 15 realistische Demo-VertrÃ¤ge (Microsoft 365, Adobe CC, Slack, GitHub, Jira, Vercel, Telekom, Vodafone, Allianz, HDI, BÃ¼ro-Miete, BMW Leasing, Google Workspace, HubSpot, DATEV)

---

## Build-Status

| Check | Status |
|---|---|
| TypeScript (`npm run typecheck`) | âœ… 0 Fehler |
| ESLint (`npm run lint`) | âœ… 0 Fehler (4 Warnings) |
| Build (`npm run build`) | âœ… Erfolgreich |
| Dev Server (`npm run dev`) | âœ… LÃ¤uft auf Port 3001 |

---

## Bekannte EinschrÃ¤nkungen & Offene Punkte

### Noch nicht implementiert (V1-Scope, aber komplexere Integration nÃ¶tig)

| Feature | Anforderungs-ID | Grund |
|---|---|---|
| Dokumenten-Upload mit OCR | DO-01 bis DO-12 | Erfordert Azure Document Intelligence API-Key und Storage-Bucket-Konfiguration |
| E-Mail-Erinnerungen | FR-04 | Erfordert E-Mail-Service (z. B. Resend, SendGrid) |
| PDF/DOCX-Generierung fÃ¼r KÃ¼ndigungsvorlagen | KV-05, KV-06 | `docx`-Package installiert, aber Export-Logik noch nicht verdrahtet (aktuell nur .txt) |
| Stripe-Zahlungsintegration | RE-04 | Erfordert Stripe-Account und API-Keys |
| Cookie-Banner | RE-02 | Kann als separate Komponente nachgerÃ¼stet werden |
| Zwei-Faktor-Authentifizierung | AU-05 | Supabase MFA-Konfiguration erforderlich |

### Technische Hinweise

1. **Middleware-Deprecation:** Next.js 16 hat `middleware.ts` zugunsten von `proxy.ts` deprecated. Die aktuelle Middleware funktioniert, sollte aber bei Gelegenheit migriert werden.
2. **Supabase-Typen:** Die Supabase-Client-Erstellung nutzt aktuell keine generischen DB-Typen (`Database`), um KompatibilitÃ¤tsprobleme mit `@supabase/ssr` zu vermeiden. Typsicherheit wird Ã¼ber die Interface-Definitionen in `src/types/database.ts` gewÃ¤hrleistet.
3. **Theme-Switching:** Implementiert via `localStorage` und `dark`-CSS-Klasse. Kein serverseitiges Cookie â€” bei Seitenneuladen kann es zu einem kurzen Flash kommen.

---

## Testanleitung

### Voraussetzungen
- Docker lÃ¤uft
- Lokale Supabase ist gestartet (`npx supabase start` im Projektverzeichnis)

### Schritte
1. `npm run dev` â€” Dev-Server starten
2. http://localhost:3001 Ã¶ffnen â€” Landingpage prÃ¼fen
3. "Registrieren" klicken â†’ E-Mail und Passwort eingeben
4. Inbucket Ã¶ffnen (http://127.0.0.1:54354) â†’ BestÃ¤tigungsmail finden und Link klicken
5. Einloggen â†’ Dashboard mit 15 Demo-VertrÃ¤gen sollte erscheinen
6. Alle Module durchklicken und FunktionalitÃ¤t prÃ¼fen

### Supabase Studio
- http://127.0.0.1:54353 â€” Tabellen, Daten, Auth-Benutzer direkt einsehen

---

## Dateistruktur (Ãœbersicht)

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (app)/                    # Authentifizierter Bereich
â”‚   â”‚   â”œâ”€â”€ analytics/            # Kostenanalyse
â”‚   â”‚   â”œâ”€â”€ contracts/            # Vertragsverwaltung
â”‚   â”‚   â”‚   â”œâ”€â”€ [id]/             # Vertragsdetail
â”‚   â”‚   â”‚   â””â”€â”€ new/              # Neuer Vertrag
â”‚   â”‚   â”œâ”€â”€ dashboard/            # Dashboard
â”‚   â”‚   â”œâ”€â”€ deadlines/            # Fristenverwaltung
â”‚   â”‚   â”œâ”€â”€ notifications/        # Benachrichtigungen
â”‚   â”‚   â”œâ”€â”€ organization/         # Organisationsverwaltung
â”‚   â”‚   â”œâ”€â”€ profile/              # Profil
â”‚   â”‚   â”œâ”€â”€ settings/             # Einstellungen
â”‚   â”‚   â”œâ”€â”€ templates/            # KÃ¼ndigungsvorlagen
â”‚   â”‚   â””â”€â”€ layout.tsx            # App-Shell mit Sidebar
â”‚   â”œâ”€â”€ legal/                    # Rechtliche Seiten
â”‚   â”œâ”€â”€ login/                    # Login
â”‚   â”œâ”€â”€ register/                 # Registrierung
â”‚   â”œâ”€â”€ layout.tsx                # Root-Layout
â”‚   â”œâ”€â”€ page.tsx                  # Landingpage
â”‚   â””â”€â”€ globals.css               # Globale Styles
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â””â”€â”€ Sidebar.tsx           # Navigation
â”‚   â””â”€â”€ ui/                       # Wiederverwendbare UI-Komponenten
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ supabase/                 # Supabase-Client-Utilities
â”‚   â””â”€â”€ utils.ts                  # cn() Helper
â”œâ”€â”€ messages/
â”‚   â”œâ”€â”€ de.json                   # Deutsche Ãœbersetzungen
â”‚   â””â”€â”€ en.json                   # Englische Ãœbersetzungen
â”œâ”€â”€ i18n/
â”‚   â””â”€â”€ request.ts                # next-intl Konfiguration
â”œâ”€â”€ types/
â”‚   â””â”€â”€ database.ts               # TypeScript-Interfaces
â””â”€â”€ middleware.ts                  # Route-Schutz
supabase/
â”œâ”€â”€ config.toml                   # Lokale Supabase-Konfiguration
â”œâ”€â”€ migrations/
â”‚   â””â”€â”€ 20260416120000_initial_schema.sql  # Datenbankschema
â””â”€â”€ seed.sql                      # Demo-Daten-Funktion
```


