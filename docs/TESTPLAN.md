# Vertragsmanager â€” Testplan

## Testbenutzer

| E-Mail | Passwort | Rolle | Unternehmen |
|---|---|---|---|
| `superadmin@Vertragsmanager.de` | `Test1234!` | Superadmin | â€” |
| `admin@wamocon.de` | `Test1234!` | Unternehmensadmin | WAMOCON GmbH |
| `manager@wamocon.de` | `Test1234!` | Vertragsmanager | WAMOCON GmbH |
| `leser@wamocon.de` | `Test1234!` | Leser | WAMOCON GmbH |
| `admin@techcorp.de` | `Test1234!` | Unternehmensadmin | TechCorp AG |
| `manager@techcorp.de` | `Test1234!` | Vertragsmanager | TechCorp AG |
| `leser@techcorp.de` | `Test1234!` | Leser | TechCorp AG |

---

## A. Automatisierte Komponententests (Unit/Integration)

Voraussetzung: `npm install -D vitest @testing-library/react @testing-library/jest-dom`

### A.1 UI Komponenten

| ID | Komponente | Test | Erwartung |
|---|---|---|---|
| A1.1 | `Button` | Render mit variant `primary`, `secondary`, `danger`, `ghost` | Korrekte CSS-Klassen, onClick aufgerufen |
| A1.2 | `Input` | Render mit/ohne `error`-Prop | Fehlermeldung wird angezeigt, roter Border |
| A1.3 | `Select` | Render mit Options-Array | Alle Optionen sichtbar, onChange funktioniert |
| A1.4 | `Card` | Render mit `CardHeader`, `CardTitle`, `CardContent` | Korrekt verschachtelt |
| A1.5 | `StatusBadge` | Render mit `active`, `expired`, `expiring_soon`, `cancelled` | Richtige Farbe und Text |
| A1.6 | `Sidebar` | Render mit `unreadCount > 0` | Badge mit Zahl sichtbar |
| A1.7 | `AdminSidebar` | Render | Alle 3 Nav-Links vorhanden (Dashboard, Unternehmen, Benutzer) |

### A.2 GeschÃ¤ftslogik

| ID | Funktion | Test | Erwartung |
|---|---|---|---|
| A2.1 | `computeMonthlyAmount` | `monthly=100` | `100` |
| A2.2 | `computeMonthlyAmount` | `quarterly=300` | `100` |
| A2.3 | `computeMonthlyAmount` | `yearly=1200` | `100` |
| A2.4 | `computeMonthlyAmount` | `one_time=500` | `0` |
| A2.5 | Vertragsfilter | Suche "Adobe" | Nur VertrÃ¤ge mit "Adobe" im Namen/Anbieter |
| A2.6 | Vertragsfilter | Status "active" | Nur aktive VertrÃ¤ge |
| A2.7 | Vertragsfilter | Kategorie "Software" | Nur Software-VertrÃ¤ge |
| A2.8 | Admin-Benutzerfilter | Rolle "reader" | Nur Leser angezeigt |
| A2.9 | Admin-Benutzerfilter | Rolle "reader" + Suche "Weber" | 0 Ergebnisse + Hinweis "Filter aktiv" |
| A2.10 | Admin-Benutzerfilter | Filter zurÃ¼cksetzen | Alle Benutzer wieder sichtbar |

### A.3 Supabase RLS (Integrationstests)

| ID | Szenario | Test | Erwartung |
|---|---|---|---|
| A3.1 | Org-Isolation | WAMOCON-User liest TechCorp-VertrÃ¤ge | Leere Ergebnisse (kein Fehler) |
| A3.2 | Org-Isolation | TechCorp-User liest WAMOCON-Mitglieder | Leere Ergebnisse |
| A3.3 | RollenprÃ¼fung | Reader versucht Contract INSERT | RLS-Fehler |
| A3.4 | RollenprÃ¼fung | Reader versucht Contract DELETE | RLS-Fehler |
| A3.5 | RollenprÃ¼fung | Manager kann Contract INSERT | Erfolg |
| A3.6 | RollenprÃ¼fung | Manager versucht Member DELETE | RLS-Fehler |
| A3.7 | Superadmin | Superadmin liest alle Profiles | Alle 7 Profile sichtbar |
| A3.8 | Profil-Sichtbarkeit | User sieht Profil von Org-Kollegen | Sichtbar |
| A3.9 | Profil-Sichtbarkeit | User sieht Profil aus fremder Org | Nicht sichtbar |

---

## B. Manueller E2E-Testplan

### B.1 Authentifizierung & Registrierung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| B1.1 | Login (Unternehmensadmin) | 1. Ã–ffne `/login` 2. `admin@wamocon.de` / `Test1234!` 3. Klick "Anmelden" | Weiterleitung zu `/dashboard`, 10 WAMOCON-VertrÃ¤ge sichtbar |
| B1.2 | Login (Superadmin) | 1. Ã–ffne `/login` 2. `superadmin@Vertragsmanager.de` / `Test1234!` | Weiterleitung zu `/admin` (Superadmin Dashboard) |
| B1.3 | Login (Reader) | `leser@wamocon.de` â†’ `/dashboard` | Dashboard sichtbar, kein "Vertrag erstellen"-Button |
| B1.4 | Login (Manager) | `manager@wamocon.de` â†’ `/dashboard` | Dashboard sichtbar |
| B1.5 | Login falsch | Falsches Passwort eingeben | Fehlermeldung "Invalid login credentials" |
| B1.6 | Registrierung | 1. Ã–ffne `/register` 2. Alle Felder ausfÃ¼llen 3. Absenden | Erfolgsseite mit Inbucket-Link (Port 54354) |
| B1.7 | E-Mail-BestÃ¤tigung | 1. Registrieren 2. Inbucket Ã¶ffnen 3. BestÃ¤tigungslink klicken | Weiterleitung zu `/dashboard`, Org wird automatisch erstellt |
| B1.8 | Logout | Sidebar â†’ Logout-Button | Weiterleitung zu `/login` |

### B.2 Dashboard

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B2.1 | Ãœbersicht | admin@wamocon.de | KPI-Karten: Aktive VertrÃ¤ge, Monatl. Kosten, Ablaufende, Benachrichtigungen |
| B2.2 | Letzte VertrÃ¤ge | admin@wamocon.de | Liste der neuesten VertrÃ¤ge angezeigt |
| B2.3 | Ungelesene Benachrichtigungen | leser@wamocon.de | Badge in Sidebar zeigt "1" (Willkommens-Nachricht) |
| B2.4 | Org-Isolation | admin@techcorp.de | Nur TechCorp-VertrÃ¤ge sichtbar (5 StÃ¼ck) |

### B.3 Vertragsverwaltung

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B3.1 | VertrÃ¤ge ansehen | admin@wamocon.de | Ã–ffne `/contracts` | 10 VertrÃ¤ge, Karten- und Listenansicht umschaltbar |
| B3.2 | Suche | admin@wamocon.de | Suche "Adobe" | 1 Ergebnis: Adobe Creative Cloud |
| B3.3 | Filter Status | admin@wamocon.de | Filter "Aktiv" | Nur aktive VertrÃ¤ge |
| B3.4 | Filter Kategorie | admin@wamocon.de | Filter "Software & SaaS" | Nur Software-VertrÃ¤ge |
| B3.5 | Sortierung | admin@wamocon.de | Sortiere nach "Kosten" | HÃ¶chste Kosten zuerst |
| B3.6 | Vertrag erstellen | admin@wamocon.de | `/contracts/new` â†’ Formular ausfÃ¼llen â†’ Speichern | Neuer Vertrag in Liste, Erinnerungen automatisch erstellt |
| B3.7 | Vertrag bearbeiten | admin@wamocon.de | Vertrag Ã¶ffnen â†’ "Bearbeiten" â†’ Ã„ndern â†’ Speichern | Ã„nderungen Ã¼bernommen |
| B3.8 | Manager-Sicherheitshinweis | manager@wamocon.de | Vertrag Ã¶ffnen â†’ "Bearbeiten" â†’ Speichern | Sicherheitshinweis: "Ã„nderungen werden protokolliert" â†’ BestÃ¤tigen |
| B3.9 | Vertrag lÃ¶schen | admin@wamocon.de | Vertrag Ã¶ffnen â†’ "LÃ¶schen" â†’ BestÃ¤tigen | Vertrag entfernt |
| B3.10 | LÃ¶schen (Reader) | leser@wamocon.de | Vertrag Ã¶ffnen | Kein "Bearbeiten" und kein "LÃ¶schen" Button |
| B3.11 | LÃ¶schen (Manager) | manager@wamocon.de | Vertrag Ã¶ffnen | "Bearbeiten" sichtbar, KEIN "LÃ¶schen" |
| B3.12 | Vertrag erstellen (Reader) | leser@wamocon.de | Ã–ffne `/contracts` | Kein "Vertrag erstellen" Button, `/contracts/new` leitet zu `/contracts` weiter |
| B3.13 | Vertragsdetails | admin@wamocon.de | Vertrag anklicken | Details, Erinnerungen, Kommentare angezeigt |

### B.4 Kommentarsystem

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B4.1 | Kommentar schreiben | leser@wamocon.de | Vertrag Ã¶ffnen â†’ Kommentar eintippen â†’ Senden | Kommentar erscheint mit Name und Zeitstempel |
| B4.2 | Kommentar schreiben (Admin) | admin@wamocon.de | Vertrag Ã¶ffnen â†’ Kommentar schreiben | Kommentar erscheint |
| B4.3 | Benachrichtigung | leser@wamocon.de kommentiert | Admin + Manager erhalten Benachrichtigung | Benachrichtigung in `/notifications` |

### B.5 KÃ¼ndigungsfristen & Erinnerungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B5.1 | Fristen-Seite | admin@wamocon.de â†’ `/deadlines` | KalenderÃ¼bersicht mit farbcodierten Fristen |
| B5.2 | Erinnerungen ein/aus | admin@wamocon.de â†’ Vertrag â†’ Erinnerungen | Erinnerung aktivieren/deaktivieren mÃ¶glich |

### B.6 Organisation & Mitgliederverwaltung

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B6.1 | Org-Seite | admin@wamocon.de â†’ `/organization` | WAMOCON GmbH, 3 Mitglieder sichtbar mit Rollen |
| B6.2 | Mitglied einladen | admin@wamocon.de | E-Mail + Rolle eingeben â†’ Einladen | Einladung in Tabelle, E-Mail versendet |
| B6.3 | Rollenzuweisung | admin@wamocon.de | Rolle eines Mitglieds Ã¤ndern | Rolle aktualisiert |
| B6.4 | Org-Seite (Reader) | leser@wamocon.de â†’ `/organization` | Org sichtbar, KEIN Einladen/Ã„ndern-Button |

### B.7 Analytics

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B7.1 | Ãœbersicht | admin@wamocon.de â†’ `/analytics` | Monatliche Kosten, Verteilung nach Kategorie/Status, VerlÃ¤ngerungs-Prognose |
| B7.2 | Nur eigene Org | admin@techcorp.de â†’ `/analytics` | Nur TechCorp-Analytics (5 VertrÃ¤ge) |

### B.8 Profil & Einstellungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B8.1 | Profil | admin@wamocon.de â†’ `/profile` | Name, E-Mail, Sprache, Firma angezeigt |
| B8.2 | Name Ã¤ndern | admin@wamocon.de â†’ Name aktualisieren | Gespeichert, sofort sichtbar |
| B8.3 | Theme | `/settings` â†’ Dark Mode | Gesamte App im Dark Mode |
| B8.4 | Theme zurÃ¼ck | `/settings` â†’ Light Mode | Light Mode wieder aktiv |

### B.9 Benachrichtigungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B9.1 | Benachrichtigungsliste | admin@wamocon.de â†’ `/notifications` | Willkommens-Benachrichtigung sichtbar |
| B9.2 | Als gelesen markieren | Benachrichtigung anklicken/markieren | Badge-ZÃ¤hler sinkt |

### B.10 Vorlagen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B10.1 | E-Mail-Vorlagen | admin@wamocon.de â†’ `/templates` | KÃ¼ndigungsbrief-Vorlagen fÃ¼r aktive VertrÃ¤ge sichtbar |

---

## C. Superadmin E2E-Tests

### C.1 Admin-Dashboard

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C1.1 | Dashboard | Login als superadmin â†’ `/admin` | KPI-Karten: Gesamt-Unternehmen, Aktive, Gesamt-Benutzer, Inaktive |
| C1.2 | Letzte Unternehmen | `/admin` | Liste der zuletzt registrierten Unternehmen |

### C.2 Unternehmensverwaltung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C2.1 | UnternehmensÃ¼bersicht | `/admin/companies` | 2 Unternehmen: WAMOCON GmbH (3 Mitglieder, 10 VertrÃ¤ge), TechCorp AG (3 Mitglieder, 5 VertrÃ¤ge) |
| C2.2 | Unternehmensdetail | Klick auf WAMOCON | Benutzer nach Rolle gruppiert (Unternehmensadmin: Anna Weber, Vertragsmanager: Max MÃ¼ller, Leser: Lisa Schmidt), VertrÃ¤gsliste |
| C2.3 | Unternehmen deaktivieren | "Deaktivieren" klicken | Status wechselt zu "Inaktiv", Button wechselt zu "Aktivieren" |
| C2.4 | Unternehmen aktivieren | "Aktivieren" klicken | Status wechselt zu "Aktiv" |

### C.3 Benutzerverwaltung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C3.1 | BenutzerÃ¼bersicht | `/admin/users` | 6 Benutzer (ohne Superadmin selbst), mit Name, E-Mail, Unternehmen, Rolle, Status |
| C3.2 | Suche | "Weber" eingeben | 1 Ergebnis: Anna Weber |
| C3.3 | Filter: Rolle | "Leser" auswÃ¤hlen | 2 Ergebnisse: Lisa Schmidt, Peter Braun |
| C3.4 | Filter: Unternehmen | "WAMOCON GmbH" auswÃ¤hlen | 3 Ergebnisse |
| C3.5 | Filter: Status | "Aktiv" auswÃ¤hlen | Nur aktive Benutzer |
| C3.6 | Filter + Suche | Filter "TechCorp" + Suche "Weber" | 0 Ergebnisse + Hinweis: "es gibt Treffer fÃ¼r Weber, aber diese werden durch aktive Filter ausgeblendet" |
| C3.7 | Filter zurÃ¼cksetzen | "Filter zurÃ¼cksetzen" klicken | Alle 6 Benutzer sichtbar |
| C3.8 | Benutzer deaktivieren | "Deaktivieren" bei einem User | Status wechselt zu "Inaktiv" |
| C3.9 | Passwort zurÃ¼cksetzen | "Passwort zurÃ¼cksetzen" â†’ neues PW eingeben â†’ OK | BestÃ¤tigung, User kann mit neuem PW anmelden |

### C.4 Rollenbasierte Zugangskontrolle (Admin-Bereich)

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C4.1 | Admin-URL als normaler User | `admin@wamocon.de` â†’ `/admin` | Weiterleitung zu `/dashboard` |
| C4.2 | Superadmin auf App-URL | `superadmin@Vertragsmanager.de` â†’ `/dashboard` | Weiterleitung zu `/admin` |
| C4.3 | Nicht eingeloggt â†’ `/admin` | Ohne Login `/admin` aufrufen | Weiterleitung zu `/login` |

---

## D. Cross-Cutting Concerns

| ID | Thema | Test | Erwartung |
|---|---|---|---|
| D1 | Dark Mode | Alle Seiten im Dark Mode durchklicken | Kein WeiÃŸblitz, konsistente Farben |
| D2 | Responsive Mobile | Browser auf 375px Breite | Sidebar eingeklappt, Tabellen scrollbar |
| D3 | i18n DE | App auf Deutsch | Alle Labels, Buttons, Fehlermeldungen auf Deutsch |
| D4 | Legal Footer | Homepage â†’ Footer | Links zu Impressum, Datenschutz, AGB funktionieren |
| D5 | 404-Seite | `/nonexistent` aufrufen | 404-Seite angezeigt |
| D6 | Org-Isolation gesamt | Als WAMOCON-User: keine TechCorp-Daten sichtbar | Strikt getrennt in allen Modulen |



