---
name: anforderungsdokument
description: >-
  Erstellt ein vollstaendiges WAMOCON Anforderungs- und Analysedokument (.docx)
  aus der Projektbeschreibung in IDEA.md. Ein Dokument enthaelt alle 15 Kapitel:
  Marktanalyse, Wettbewerb, Zielgruppe, Loesungsoptionen, Anforderungen V1,
  Kostenanalyse, Umsetzungsplan und mehr. Workflow: IDEA.md ausfullen,
  Skill aufrufen, Dokument pruefen, Freigabe, dann Implementierung starten.
---

# WAMOCON Anforderungs- und Analysedokument

## Uebersicht

Dieser Skill erstellt **ein einziges, vollstaendiges Word-Dokument** (`.docx`) nach dem
WAMOCON-Standard. Das Dokument vereint Anforderungsanalyse und Business-Analyse in einem
einheitlichen 15-Kapitel-Format und dient als Grundlage fuer die Freigabe durch die
Geschaeftsfuehrung.

**Das Dokument wird nach der Freigabe zum Startpunkt fuer die Implementierung.**
Erst wenn es genehmigt ist, wird mit der Entwicklung begonnen.

---

## SCHRITT-FUR-SCHRITT WORKFLOW

```
[1] Projektidee in IDEA.md eintragen (Projekt-Root)
        |
        v
[2] Skill aufrufen (GitHub Copilot Chat oder Claude)
        |
        v
[3] KI liest IDEA.md, erstellt scripts/generate-anforderungsdokument.mjs,
    fuehrt das Skript aus
        |
        v
[4] Dokument wird generiert: public/Anforderungsdokument_[ProjektName].docx
        |
        v
[5] Dokument oeffnen, pruefen, ggf. per Hand ergaenzen
        |
        v
[6] Zur Freigabe einreichen (Geschaeftsfuehrung)
        |
        v
[7] Nach Freigabe: Implementierung starten (@planner -> @developer)
```

---

## SCHRITT 1: IDEA.md ausfullen

Die Datei `IDEA.md` liegt im **Projekt-Root** (direkt im Hauptverzeichnis des Projekts).
Sie ist das einzige, was der Nutzer ausfullen muss, bevor er den Skill aufruft.

**Speicherort:** `IDEA.md` (Projekt-Root, nicht in einem Unterordner)

```markdown
# Projektidee

## Projektname
[Name der App, z.B. "Universal Inventory Manager"]

## Beschreibung
[3 bis 5 Saetze: Was macht die App? Welches Problem loest sie?
 Beispiel: "Eine webbasierte App fuer KMU zur Lagerverwaltung..."]

## Zielgruppe
[Branche, Unternehmensgroesse, Rolle. Beispiel: "Lagerleiter in KMU, 10-200 MA"]

## Kernproblem
[Das konkrete Problem ohne die App. Beispiel: "Lagerfehler kosten KMU 14 % Umsatz"]

## Gewuenschte Hauptfunktionen Version 1
- [Funktion 1]
- [Funktion 2]

## Tech-Stack (optional)
[z.B. Next.js, Supabase, Tailwind]

## Marktsegment und Branche
[z.B. Lagerverwaltung, KMU, Deutschland]

## Bekannte Wettbewerber (optional)
[z.B. SAP EWM, Sage Wawi, Pickware]

## Ersteller
[Vollstaendiger Name]

## Empfaenger (Geschaeftsfuehrung)
[Name, Titel, z.B. "Max Mustermann, CEO"]

## Welle und Version
1
```

**Vorlage:** Die fertige `IDEA.md`-Vorlage liegt im Projekt-Root.

---

## SCHRITT 2: Skill aufrufen

### Option A — GitHub Copilot Chat (VS Code)

Oeffne den GitHub Copilot Chat (`Ctrl+Alt+I`) und schreibe:

```
@workspace Erstelle das WAMOCON Anforderungs- und Analysedokument.

Lies zuerst IDEA.md im Projekt-Root, dann .github/skills/anforderungsdokument/SKILL.md.
Erstelle danach das vollstaendige 15-Kapitel-Dokument auf Deutsch als .docx.
Skript: scripts/generate-anforderungsdokument.mjs
Ausgabe: public/Anforderungsdokument_[ProjektName].docx
```

**Oder mit mehr Kontext (empfohlen fuer maximale Qualitaet):**
```
@workspace Du bist der Senior Business Analyst bei WAMOCON GmbH.

Lies IDEA.md und .github/skills/anforderungsdokument/SKILL.md.
Erstelle ein vollstaendiges WAMOCON Anforderungs- und Analysedokument:
- Alle 15 Pflichtkapitel
- Echte Marktdaten mit deutschen Quellen (Bitkom, IfM, BMWK, Statista)
- Anforderungstabellen mit Kernmodul- und Basisfunktionalitaeten
- Loesungsoptionen-Vergleich mit 4 Optionen
- Kostenanalyse mit Amortisierungsrechnung
- Alles auf Deutsch, Arial Narrow, schwarze Tabellenkoepfe
Skript: scripts/generate-anforderungsdokument.mjs
Ausgabe: public/Anforderungsdokument_[ProjektName].docx
```

### Option B — Claude Code (claude.ai/code oder Claude Desktop)

```
Du bist der Senior Business Analyst bei WAMOCON GmbH.
Lies IDEA.md im Projekt-Root.
Dann lies .github/skills/anforderungsdokument/SKILL.md fuer alle Formatregeln.

Erstelle ein vollstaendiges WAMOCON Anforderungs- und Analysedokument:
- Alle 15 Pflichtkapitel in der richtigen Reihenfolge
- Echte Marktdaten und Quellenangaben
- Vollstaendige Anforderungstabellen (K- und B-Praefix)
- Amortisierungsrechnung als Tabelle
- Ausschliesslich Deutsch mit echten Umlauten (ä ö ü ß)
- Kein \n in TextRun, WidthType.DXA, ShadingType.CLEAR

Erstelle das Skript: scripts/generate-anforderungsdokument.mjs
Fuehre es aus: node scripts/generate-anforderungsdokument.mjs
Ausgabe bestaetigen: public/Anforderungsdokument_[ProjektName].docx
```

### Option C — Terminal (wenn Skript bereits vorhanden)

```bash
npm run gen:anforderungsdokument
```

---

## SCHRITT 3: WAS DIE KI TUN MUSS

Wenn dieser Skill aufgerufen wird, fuehrt die KI folgende Schritte aus:

1. `IDEA.md` lesen und alle Projektdaten extrahieren
2. Diesen Skill ( `SKILL.md`) komplett lesen und alle Regeln internalisieren
3. Das Skript `scripts/generate-anforderungsdokument.mjs` schreiben (vollstaendig, mit realem Content aus IDEA.md und echten Quellen)
4. Sicherstellen dass `docx` installiert ist: `npm install docx`
5. Skript ausfuehren: `node scripts/generate-anforderungsdokument.mjs`
6. Pfad bestaetigen: "Dokument erstellt: public/Anforderungsdokument_[Name].docx"
7. Nutzer anweisen: Dokument oeffnen, pruefen, zur Freigabe einreichen

---

## ABSCHNITT A: DOKUMENTSTRUKTUR (15 Kapitel)

**Ein einziges vollstaendiges Dokument:**

### Deckblatt

```
[Dicke horizontale Trennlinie oben, size 12]

WAMOCON GMBH
ANFORDERUNGS- UND ANALYSEDOKUMENT
[Projektname als Untertitel, zentriert]

[Rahmenlose zweispaltige Metadaten-Tabelle (KEIN Rahmen):]
Welle:           | [Wellennummer]
Projekt:         | [App-Name]
Unternehmen:     | WAMOCON GmbH
App Version:     | 1
Erstellt von:    | [Name aus IDEA.md]
Eingereicht an:  | [Empfaenger aus IDEA.md]
Datum:           | [TT.MM.JJJJ - aktuelles Datum einsetzen]
Vertraulichkeit: | Intern vertraulich
Status:          | Zur Freigabe eingereicht

[Gestrichelte Trennlinie unten, style DASHED, size 6]
```

---

### Kapitel 1: Zusammenfassung
- Beginnt mit dem Kernnutzen und Marktpotenzial (NICHT mit Problembeschreibung)
- 3 bis 5 Absaetze, Kernaussagen fett
- Empfehlung vorwegnehmen: "Dieses Dokument empfiehlt..."
- Abschluss: Was nach der Freigabe als naechstes passiert

### Kapitel 2: Hintergrund und Marktkontext
- Warum dieses Thema jetzt relevant ist (Markttrend, externer Ausloeser)
- Aktueller Stand der Branche
- Was sich in den letzten 1 bis 3 Jahren veraendert hat

### Kapitel 3: Marktanalyse
Pflichtunterkapitel:
- 3.1 Marktgroesse und Zielgruppe in Zahlen (Fokus Deutschland, Europa ergaenzend)
- 3.2 Wachstum und Prognosen (CAGR, Marktvolumen 2024 bis 2030)
- 3.3 Das Kernproblem (faktisch belegt, mit Quellenangaben)
- 3.4 Regulatorisches Umfeld (DSGVO, GoBD, branchenspezifische Gesetze)

Jede Zahl mit Quellenangabe: `*Quelle: [Angabe]*` (kursiv am Absatzende)

### Kapitel 4: Wettbewerbsanalyse
- Echte Wettbewerber, nach Segmenten gruppiert (Enterprise, Mittelstand, Open Source)
- Staerken und Schwaechen je Wettbewerber
- Vergleichstabelle: Wettbewerber | Staerken | Schwaechen | Preis
- Marktluecke: Was kein Wettbewerber abdeckt

### Kapitel 5: Zielgruppe
- **Primaere Zielgruppe:** Genaue Beschreibung mit Zahlen
- **Sekundaere Zielgruppe:** Ergaenzend
- **Nicht-Zielgruppe:** Wen die App NICHT adressiert
- Nutzerprofile als Fliesstext (Personas mit Namen, keine Listen)

### Kapitel 6: Loesungsanalyse und Optionen
**Vergleichstabelle mit 4 Optionen (Option 1 immer "Status quo"):**

```
| Kriterium        | Option 1 (Status quo)  | Option 2 (SaaS)  | Option 3 (Eigenentwicklung) | Option 4 (Hybrid)  |
|------------------|------------------------|------------------|-----------------------------|-------------------|
| Kosten           | laufende Kosten        | [EUR/Monat]      | [Einmalinvestition]         | [Mix]             |
| Anpassbarkeit    | keine                  | begrenzt         | vollstaendig                | hoch              |
| Datenschutz      | aktuell                | abhaengig        | volle Kontrolle             | hoch              |
| Amortisierung    | entfaellt              | sofort           | [Monate]                    | [Monate]          |
| Empfehlung       | Nicht empfohlen        | Alternative      | **Empfohlen**               | Fallback          |
```

2 bis 3 Saetze klare Empfehlung am Ende.

### Kapitel 7: Nutzen und Alleinstellungsmerkmal
- Konkreter Nutzen mit messbaren Zahlen (Zeit- oder Kostenersparnis in %)
- Ein USP-Satz: das Alleinstellungsmerkmal in einem Satz
- Vergleich: Wie ist dieses Produkt besser als bestehende Loesungen?

### Kapitel 8: Anwendungsfaelle
- Mindestens 5 konkrete Anwendungsfaelle aus der Praxis
- Format: Tabellarisch -- Bereich | Anwendungsfall | Erwarteter Nutzen
- Bezug auf echte Arbeitssituationen (keine abstrakten Beispiele)

### Kapitel 9: Anforderungen Version 1
**Tabelle A: Kernmodul-Anforderungen (Praefix K-)**
Spezifische Funktionen aus IDEA.md, mindestens 8 Eintraege.
```
K-01 | [Kernfunktion 1]      | Muss | Neu
K-02 | [Kernfunktion 2]      | Muss | Neu
...
```

**Tabelle B: Basisfunktionalitaeten (Praefix B-) -- IMMER VOLLSTAENDIG:**
```
B-01 | Rollen- und Rechteprinzip                              | Muss | Neu
B-02 | Anmeldung und Registrierung (E-Mail mit Bestaetigung)  | Muss | Neu
B-03 | Passwort zuruecksetzen                                 | Muss | Neu
B-04 | Admin-Bereich fuer Nutzerverwaltung                    | Muss | Neu
B-05 | Profilseite                                            | Muss | Neu
B-06 | Dashboard als Startseite                               | Muss | Neu
B-07 | Navigation mit Breadcrumbs                             | Muss | Neu
B-08 | Benachrichtigungssystem (In-App und per E-Mail)        | Soll | Neu
B-09 | Spracheinstellungen (Deutsch und Englisch)             | Muss | Neu
B-10 | Dunkel/Hell-Modus                                      | Soll | Neu
B-11 | FAQ und Hilfebereich                                   | Soll | Neu
B-12 | AGB, Impressum, Datenschutzerklaerung                  | Muss | Neu
B-13 | Cookie-Banner nach DSGVO                               | Muss | Neu
B-14 | DSGVO-Funktionen (Daten exportieren, Konto loeschen)   | Muss | Neu
B-15 | Geschaeftsmodell (Free/Lite und Pro)                   | Muss | Neu
B-16 | Upgrade von Free auf Premium in der App                | Muss | Neu
```

**In-Scope / Out-of-Scope Tabelle (2 Spalten):**
```
In Scope Version 1             | Out of Scope Version 1
[Kernfunktionen aus IDEA.md]   | [Spaetere Versionen, externe Integrationen]
```

Prioritaeten: Muss = fuer Launch zwingend | Soll = wenn Zeit | Kann = spaetere Version

### Kapitel 10: Kostenanalyse und ROI
Pflichtunterkapitel:
- 10.1 Geschaetzte Entwicklungskosten (Stunden x Stundensatz)
- 10.2 Laufende Betriebskosten (Hosting, Tools, Lizenzen)
- 10.3 Amortisierungsrechnung

**Amortisierungstabelle:**
```
| Zeitraum   | Investition (EUR) | Einsparung/Umsatz (EUR) | Kumuliert (EUR) |
|------------|-------------------|-------------------------|-----------------|
| Monat 1-3  | [Betrag]          | [Betrag]                | [Saldo]         |
| Monat 4-6  | 0                 | [Betrag]                | [Saldo]         |
| Monat 7-12 | 0                 | [Betrag]                | **Break-even**  |
| Jahr 2     | [Wartung]         | [Betrag]                | [Netto-Gewinn]  |
```

### Kapitel 11: Chancen und Risiken
**Chancen:** 3 bis 5 konkrete Marktchancen mit Zahlen und Quellen

**Risikotabelle:**
```
| Nr. | Risiko                | Wahrscheinlichkeit | Auswirkung | Gegenmassnahme    |
|-----|-----------------------|--------------------|------------|-------------------|
| 1   | [Risikobeschreibung]  | Mittel             | Hoch       | [Massnahme]       |
```

### Kapitel 12: Besondere Herausforderungen und Abhaengigkeiten
- Externe Abhaengigkeiten (APIs, Dienste, Behoerden)
- Technische Herausforderungen
- Markteintrittsbarrieren
- Ehrliche Einschaetzung ohne Schoenrederei

### Kapitel 13: Technischer Umsetzungsplan
- Tech-Stack aus IDEA.md (oder Standard: Next.js, Supabase, Tailwind, Vercel)
- Phasen mit Dauer:
  ```
  Phase 1 (5 Tage):  Grundstruktur, Auth, DB-Schema
  Phase 2 (10 Tage): Kernmodul (Funktionen aus IDEA.md)
  Phase 3 (5 Tage):  UI-Feinschliff, Tests
  Phase 4 (3 Tage):  Deployment, Dokumentation
  ```
- GitHub Copilot als KI-Entwicklungswerkzeug benennen
- MVP-Definition: Was ist am Ende jeder Phase fertig?

### Kapitel 14: Expertenempfehlung
- Klare persoenliche Empfehlung des Verfassers (direkt, keine Floskeln)
- 5 bis 7 Diskussionspunkte fuer den Entscheidungstraeger
- Abschluss: "Fuer Rueckfragen stehe ich jederzeit zur Verfuegung."
- Signatur: Ersteller | Datum | WAMOCON GmbH

### Kapitel 15: Quellenverzeichnis
- Tabellarisch: Nr. | Quelle | URL / Fundstelle
- Nur reale, oeffentlich verfuegbare Quellen
- Jede Zahl im Dokument muss mindestens eine Quelle haben
- Empfohlene Quellen: IfM Bonn, Bitkom, BMWK, Gartner, Statista, Fraunhofer

---

## ABSCHNITT B: WAMOCON-FORMATREGELN

### B1 -- Sprache (STRIKT)

- **Ausschliesslich Deutsch** mit echten Unicode-Umlauten
  - FALSCH: ae, oe, ue, Ae, Oe, Ue
  - RICHTIG: ae oe ue NEIN -- ä ö ü Ä Ö Ü ß JA
- **Keine Gedankenstriche** als Satz-Trenner (kein -- oder --)
  Stattdessen: Komma oder neuer Satz
- Anglizismen beim ersten Erscheinen mit Fussnote erklaeren
- Kein "Executive Summary" -> "Zusammenfassung"
- Kein "Return on Investment" -> "Rendite der Investition" (danach ROI mit Fussnote)
- Saetze kurz: max. 2 Teilsaetze
- Keine Hinweise auf KI-Hilfe oder interne Leitlinien

### B2 -- Seitenkopf (alle Seiten ausser Deckblatt)

Links: "WAMOCON GmbH, Mergenthalerallee 79-81, 65760 Eschborn" (8pt, grau)
Darunter: duenne graue Trennlinie (BorderStyle.SINGLE, size 4, color CCCCCC)

### B3 -- Tabellenformat

- Tabellenkopf: schwarz (fill: "000000") mit weissem Text, fett
- Zeilen: alternierend weiss / hellgrau (fill: "F5F5F5")
- Anforderungstabellen immer 4 Spalten: ID | Anforderung | Prioritaet | Status
- WidthType.DXA mit expliziten columnWidths (KEIN WidthType.PERCENTAGE)
- ShadingType.CLEAR fuer alle Zellenfarben

### B4 -- Fussnoten

- Beginnen bei ID 1 (IDs 0 und -1 von Word reserviert)
- Syntax: `new FootnoteReferenceRun(1)` als Zahl (NICHT `{ id: 1 }`)
- Mindestens 3 Fussnoten: DSGVO, KMU, GoBD

---

## ABSCHNITT C: TECHNISCHE IMPLEMENTIERUNG

### C1 -- Voraussetzungen

```bash
npm install docx
```

`package.json` ergaenzen:
```json
"scripts": {
  "gen:anforderungsdokument": "node scripts/generate-anforderungsdokument.mjs"
}
```

Ausfuehren:
```bash
npm run gen:anforderungsdokument
```

Der Ordner `public/` muss existieren. Falls nicht:
```bash
mkdir public
```

### C2 -- Pflicht-Imports

```javascript
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, BorderStyle, FootnoteReferenceRun,
  Header, PageBreak
} from "docx";
import fs from "fs";
```

### C3 -- Kritische API-Regeln

```javascript
// RICHTIG: FootnoteReferenceRun nimmt Zahl
new FootnoteReferenceRun(1)

// FALSCH: kein Objekt
new FootnoteReferenceRun({ id: 1 })

// RICHTIG: Breite in DXA
{ width: { size: 9000, type: WidthType.DXA } }

// FALSCH: kein PERCENTAGE
{ width: { size: 100, type: WidthType.PERCENTAGE } }

// RICHTIG: ShadingType.CLEAR
shading: { fill: "000000", type: ShadingType.CLEAR }

// FALSCH: kein ShadingType.SOLID
shading: { fill: "000000", type: ShadingType.SOLID }

// FALSCH: kein \n in TextRun
new TextRun({ text: "Zeile1\nZeile2" })
// RICHTIG: separate Paragraphen

// FALSCH: kein border.bottom bei Headings
heading: HeadingLevel.HEADING_1,
border: { bottom: { ... } }  // NIEMALS bei Headings
```

### C4 -- Standard-Hilfsfunktionen

```javascript
const FONT = "Arial Narrow";

const r = (text, opts = {}) =>
  new TextRun({ text, font: FONT, size: 22, ...opts });

const p = (text, opts = {}) =>
  new Paragraph({ children: [r(text)], spacing: { after: 100 }, ...opts });

const h1 = (text) => new Paragraph({
  text, heading: HeadingLevel.HEADING_1,
  spacing: { before: 300, after: 120 }
});

const h2 = (text) => new Paragraph({
  text, heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 80 }
});

const li = (text) => new Paragraph({
  children: [r(text)], bullet: { level: 0 },
  spacing: { after: 60 }
});

const source = (text) => new Paragraph({
  children: [r(text, { italics: true, size: 18, color: "666666" })],
  spacing: { after: 80 }
});

const makeHeaderCell = (text, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: { fill: "000000", type: ShadingType.CLEAR },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [r(text, { bold: true, color: "FFFFFF", size: 20 })]
  })]
});

const makeDataCell = (text, width, isGray = false) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: { fill: isGray ? "F5F5F5" : "FFFFFF", type: ShadingType.CLEAR },
  children: [new Paragraph({ children: [r(text, { size: 20 })] })]
});

const reqTable = (rows) => new Table({
  columnWidths: [1000, 5500, 1500, 1000],
  width: { size: 9000, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        makeHeaderCell("ID", 1000),
        makeHeaderCell("Anforderung", 5500),
        makeHeaderCell("Prioritaet", 1500),
        makeHeaderCell("Status", 1000),
      ]
    }),
    ...rows.map(([id, req, prio, status], i) => new TableRow({
      children: [
        makeDataCell(id, 1000, i % 2 !== 0),
        makeDataCell(req, 5500, i % 2 !== 0),
        makeDataCell(prio, 1500, i % 2 !== 0),
        makeDataCell(status, 1000, i % 2 !== 0),
      ]
    }))
  ]
});

const coverTable = (rows) => new Table({
  columnWidths: [3000, 6000],
  width: { size: 9000, type: WidthType.DXA },
  borders: {
    top: { style: BorderStyle.NONE, size: 0 },
    bottom: { style: BorderStyle.NONE, size: 0 },
    left: { style: BorderStyle.NONE, size: 0 },
    right: { style: BorderStyle.NONE, size: 0 },
    insideH: { style: BorderStyle.NONE, size: 0 },
    insideV: { style: BorderStyle.NONE, size: 0 },
  },
  rows: rows.map(([label, value]) => new TableRow({
    children: [
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        children: [new Paragraph({ children: [r(label, { bold: true })] })]
      }),
      new TableCell({
        width: { size: 6000, type: WidthType.DXA },
        children: [new Paragraph({ children: [r(value)] })]
      }),
    ]
  }))
});

function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        children: [r(
          "WAMOCON GmbH, Mergenthalerallee 79-81, 65760 Eschborn",
          { size: 16, color: "888888" }
        )]
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" } },
        children: [new TextRun({ text: "" })]
      })
    ]
  });
}

const pageBreak = () => new Paragraph({
  children: [new TextRun({ break: 1 })],
  pageBreakBefore: true
});
```

### C5 -- Dokument-Grundstruktur

```javascript
const doc = new Document({
  footnotes: {
    1: { children: [new Paragraph({ children: [r("DSGVO: Datenschutz-Grundverordnung, EU-Verordnung 2016/679")] })] },
    2: { children: [new Paragraph({ children: [r("KMU: Kleine und Mittlere Unternehmen, bis 499 Mitarbeiter (IfM Bonn)")] })] },
    3: { children: [new Paragraph({ children: [r("GoBD: Grundsaetze zur ordnungsmaessigen Fuehrung von Buechern, BMF 2019")] })] },
  },
  sections: [{
    properties: {
      titlePage: true,
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
      }
    },
    headers: {
      first: new Header({ children: [] }),
      default: makeHeader(),
    },
    children: [
      ...deckblattChildren,
      pageBreak(),
      ...kapitel1, ...kapitel2, ...kapitel3,
      // alle 15 Kapitel
    ],
  }],
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "heading 1",
        basedOn: "Normal", next: "Normal",
        run: { bold: true, size: 34, font: FONT, color: "1E3A5F" },
        paragraph: { spacing: { before: 300, after: 120 } }
      },
      {
        id: "Heading2", name: "heading 2",
        basedOn: "Normal", next: "Normal",
        run: { bold: true, size: 26, font: FONT, color: "2E4057" },
        paragraph: { spacing: { before: 200, after: 80 } }
      },
    ]
  }
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("public/Anforderungsdokument_[ProjektName].docx", buffer);
console.log("Dokument erstellt: public/Anforderungsdokument_[ProjektName].docx");
```

---

## ABSCHNITT D: QUALITAETSSTANDARDS

### Was maximale Qualitaet ausmacht

| Faktor | Unzureichend | Sehr gut |
|---|---|---|
| **Zahlen** | "viele Unternehmen" | "68 % der KMU in Deutschland (Bitkom 2024)" |
| **Quellen** | keine | IfM Bonn, Bitkom, BMWK, Gartner, Statista |
| **Empfehlung** | vage | "Ich empfehle Option 3, weil A und B" |
| **Anforderungen** | Stichworte | vollstaendige Tabelle mit ID, Prio, Status |
| **Sprache** | ae/oe/ue Schreibweise | echte Umlaute ä ö ü ß |
| **Struktur** | beliebige Kapitel | exakt 15 Kapitel in Reihenfolge |
| **Tabellen** | plain text | schwarzer Header, alternierend grau/weiss |
| **Kostenanalyse** | grobe Schaetzung | Amortisierungstabelle mit Break-even-Monat |

### Nach der Generierung

1. Dokument oeffnen: `public/Anforderungsdokument_[ProjektName].docx`
2. Alle Marktdaten und Quellen in Kapitel 3 verifizieren
3. Anforderungen in Kapitel 9 mit dem Team abgleichen
4. Kostenangaben in Kapitel 10 anpassen
5. Umsetzungsplan in Kapitel 13 auf reale Zeitplanung anpassen
6. Dokument an Empfaenger in der Geschaeftsfuehrung einreichen
7. Nach Freigabe: Implementierung mit `@planner` starten
