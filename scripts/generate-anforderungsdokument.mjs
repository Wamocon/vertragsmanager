/**
 * WAMOCON Anforderungs- und Analysedokument Generator
 *
 * VERWENDUNG:
 *   1. IDEA.md im Projekt-Root ausfullen
 *   2. Dieses Skript wird von der KI (Copilot oder Claude) anhand von IDEA.md
 *      mit echtem Inhalt befüllt und dann ausgefuehrt
 *   3. npm run gen:anforderungsdokument
 *
 * ANLEITUNG: .github/skills/anforderungsdokument/SKILL.md
 *
 * AUSGABE: public/Anforderungsdokument_[ProjektName].docx
 *
 * HINWEIS: Dieses ist die Vorlage. Die KI ersetzt alle [Platzhalter] mit
 *          echtem Inhalt aus IDEA.md und genuinen Marktdaten.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  AlignmentType,
  BorderStyle,
  FootnoteReferenceRun,
  Header,
} from "docx";
import fs from "fs";

// ─── Projektdaten (aus IDEA.md befüllen) ────────────────────────────────────

const PROJECT = {
  name: "[ProjektName]",
  wellennummer: "1",
  ersteller: "[Ersteller aus IDEA.md]",
  empfaenger: "[Empfaenger aus IDEA.md]",
  datum: new Date().toLocaleDateString("de-DE"),
  outputFile: "public/Anforderungsdokument_[ProjektName].docx",
};

// ─── Schriftart ─────────────────────────────────────────────────────────────

const FONT = "Arial Narrow";

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

const r = (text, opts = {}) =>
  new TextRun({ text, font: FONT, size: 22, ...opts });

const p = (text, opts = {}) =>
  new Paragraph({ children: [r(text)], spacing: { after: 100 }, ...opts });

const h1 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 },
  });

const h2 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
  });

const h3 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 60 },
  });

const li = (text) =>
  new Paragraph({
    children: [r(text)],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });

const source = (text) =>
  new Paragraph({
    children: [r(text, { italics: true, size: 18, color: "666666" })],
    spacing: { after: 80 },
  });

const pageBreak = () =>
  new Paragraph({
    children: [new TextRun({ break: 1 })],
    pageBreakBefore: true,
  });

// ─── Tabellenhelfer ─────────────────────────────────────────────────────────

const makeHeaderCell = (text, width) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "000000", type: ShadingType.CLEAR },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [r(text, { bold: true, color: "FFFFFF", size: 20 })],
      }),
    ],
  });

const makeDataCell = (text, width, isGray = false) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { fill: isGray ? "F5F5F5" : "FFFFFF", type: ShadingType.CLEAR },
    children: [
      new Paragraph({ children: [r(text, { size: 20 })] }),
    ],
  });

// 4-spaltige Anforderungstabelle
const reqTable = (rows) =>
  new Table({
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
        ],
      }),
      ...rows.map(([id, req, prio, status], i) =>
        new TableRow({
          children: [
            makeDataCell(id, 1000, i % 2 !== 0),
            makeDataCell(req, 5500, i % 2 !== 0),
            makeDataCell(prio, 1500, i % 2 !== 0),
            makeDataCell(status, 1000, i % 2 !== 0),
          ],
        })
      ),
    ],
  });

// Rahmenlose Deckblatt-Tabelle (2 Spalten)
const coverTable = (rows) =>
  new Table({
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
    rows: rows.map(([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 3000, type: WidthType.DXA },
            children: [new Paragraph({ children: [r(label, { bold: true })] })],
          }),
          new TableCell({
            width: { size: 6000, type: WidthType.DXA },
            children: [new Paragraph({ children: [r(value)] })],
          }),
        ],
      })
    ),
  });

// Seitenkopf (ab Seite 2)
function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        children: [
          r("WAMOCON GmbH, Mergenthalerallee 79-81, 65760 Eschborn", {
            size: 16,
            color: "888888",
          }),
        ],
      }),
      new Paragraph({
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
        },
        children: [new TextRun({ text: "" })],
      }),
    ],
  });
}

// ─── Deckblatt ───────────────────────────────────────────────────────────────

const deckblattChildren = [
  new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 12, color: "000000" } },
    children: [new TextRun({ text: "" })],
    spacing: { after: 200 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [r("WAMOCON GMBH", { bold: true, size: 32, allCaps: true })],
    spacing: { after: 80 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      r("ANFORDERUNGS- UND ANALYSEDOKUMENT", {
        bold: true,
        size: 28,
        allCaps: true,
      }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [r(PROJECT.name, { bold: true, size: 24 })],
    spacing: { after: 400 },
  }),
  coverTable([
    ["Welle:", PROJECT.wellennummer],
    ["Projekt:", PROJECT.name],
    ["Unternehmen:", "WAMOCON GmbH"],
    ["App Version:", "1"],
    ["Erstellt von:", PROJECT.ersteller],
    ["Eingereicht an:", PROJECT.empfaenger],
    ["Datum:", PROJECT.datum],
    ["Vertraulichkeit:", "Intern vertraulich"],
    ["Status:", "Zur Freigabe eingereicht"],
  ]),
  new Paragraph({
    border: {
      bottom: { style: BorderStyle.DASHED, size: 6, color: "000000" },
    },
    children: [new TextRun({ text: "" })],
    spacing: { before: 400 },
  }),
];

// ─── KAPITEL (Platzhalter — KI befüllt mit echtem Inhalt aus IDEA.md) ────────

// Kapitel 1: Zusammenfassung
const kapitel1 = [
  h1("1. Zusammenfassung"),
  p("[Zusammenfassung mit Kernnutzen und Marktpotenzial. Empfehlung vorwegnehmen.]"),
  p("[Hinweis: Die KI ersetzt diesen Platzhalter mit echtem Inhalt aus IDEA.md]"),
];

// Kapitel 2: Hintergrund und Marktkontext
const kapitel2 = [
  h1("2. Hintergrund und Marktkontext"),
  p("[Warum ist dieses Thema jetzt relevant? Markttrend, externer Ausloeser.]"),
];

// Kapitel 3: Marktanalyse
const kapitel3 = [
  h1("3. Marktanalyse"),
  h2("3.1 Marktgroesse und Zielgruppe in Zahlen"),
  p("[Marktdaten fuer Deutschland, z.B. Bitkom, IfM Bonn, BMWK]"),
  source("Quelle: [Quellenangabe]"),
  h2("3.2 Wachstum und Prognosen"),
  p("[CAGR, Marktvolumen 2024 bis 2030]"),
  h2("3.3 Das Kernproblem"),
  p("[Faktisch belegt mit Quellen]"),
  h2("3.4 Regulatorisches Umfeld"),
  p("[DSGVO, GoBD, branchenspezifische Gesetze]"),
];

// Kapitel 4: Wettbewerbsanalyse
const kapitel4 = [
  h1("4. Wettbewerbsanalyse"),
  p("[Echte Wettbewerber nach Segmenten, Vergleichstabelle, Marktluecke]"),
];

// Kapitel 5: Zielgruppe
const kapitel5 = [
  h1("5. Zielgruppe"),
  p("[Primaere Zielgruppe mit Zahlen, Sekundaere Zielgruppe, Nicht-Zielgruppe]"),
];

// Kapitel 6: Loesungsanalyse
const kapitel6 = [
  h1("6. Loesungsanalyse und Optionen"),
  p("[4-Optionen-Vergleich: Status quo, SaaS, Eigenentwicklung, Hybrid]"),
];

// Kapitel 7: Nutzen und USP
const kapitel7 = [
  h1("7. Nutzen und Alleinstellungsmerkmal"),
  p("[Messbarer Nutzen in %, USP-Satz, Vergleich zu Wettbewerbern]"),
];

// Kapitel 8: Anwendungsfaelle
const kapitel8 = [
  h1("8. Anwendungsfaelle"),
  p("[Mindestens 5 konkrete Anwendungsfaelle als Tabelle]"),
];

// Kapitel 9: Anforderungen Version 1
const kapitel9 = [
  h1("9. Anforderungen Version 1"),
  h2("9.1 Kernmodul-Anforderungen"),
  reqTable([
    ["K-01", "[Kernfunktion 1 aus IDEA.md]", "Muss", "Neu"],
    ["K-02", "[Kernfunktion 2 aus IDEA.md]", "Muss", "Neu"],
    ["K-03", "[Kernfunktion 3 aus IDEA.md]", "Muss", "Neu"],
  ]),
  p(""),
  h2("9.2 Basisfunktionalitaeten"),
  reqTable([
    ["B-01", "Rollen- und Rechteprinzip", "Muss", "Neu"],
    ["B-02", "Anmeldung und Registrierung (E-Mail mit Bestaetigung)", "Muss", "Neu"],
    ["B-03", "Passwort zuruecksetzen", "Muss", "Neu"],
    ["B-04", "Admin-Bereich fuer Nutzerverwaltung", "Muss", "Neu"],
    ["B-05", "Profilseite", "Muss", "Neu"],
    ["B-06", "Dashboard als Startseite", "Muss", "Neu"],
    ["B-07", "Navigation mit Breadcrumbs", "Muss", "Neu"],
    ["B-08", "Benachrichtigungssystem (In-App und per E-Mail)", "Soll", "Neu"],
    ["B-09", "Spracheinstellungen (Deutsch und Englisch)", "Muss", "Neu"],
    ["B-10", "Dunkel/Hell-Modus", "Soll", "Neu"],
    ["B-11", "FAQ und Hilfebereich", "Soll", "Neu"],
    ["B-12", "AGB, Impressum, Datenschutzerklaerung", "Muss", "Neu"],
    ["B-13", "Cookie-Banner nach DSGVO", "Muss", "Neu"],
    ["B-14", "DSGVO-Funktionen (Daten exportieren, Konto loeschen)", "Muss", "Neu"],
    ["B-15", "Geschaeftsmodell (Free und Pro)", "Muss", "Neu"],
    ["B-16", "Upgrade von Free auf Pro in der App", "Muss", "Neu"],
  ]),
];

// Kapitel 10: Kostenanalyse
const kapitel10 = [
  h1("10. Kostenanalyse und ROI"),
  h2("10.1 Geschaetzte Entwicklungskosten"),
  p("[Stunden x Stundensatz, realistische Schaetzung]"),
  h2("10.2 Laufende Betriebskosten"),
  p("[Hosting, Tools, Lizenzen pro Monat]"),
  h2("10.3 Amortisierungsrechnung"),
  p("[Amortisierungstabelle mit Break-even-Monat]"),
];

// Kapitel 11: Chancen und Risiken
const kapitel11 = [
  h1("11. Chancen und Risiken"),
  p("[3-5 Chancen mit Zahlen, Risikotabelle mit Gegenmassnahmen]"),
];

// Kapitel 12: Herausforderungen
const kapitel12 = [
  h1("12. Besondere Herausforderungen und Abhaengigkeiten"),
  p("[Externe Abhaengigkeiten, technische Herausforderungen]"),
];

// Kapitel 13: Umsetzungsplan
const kapitel13 = [
  h1("13. Technischer Umsetzungsplan"),
  p("[Tech-Stack, Phasenpanel mit Tagesangaben, GitHub Copilot als Werkzeug]"),
];

// Kapitel 14: Expertenempfehlung
const kapitel14 = [
  h1("14. Expertenempfehlung"),
  p("[Klare Empfehlung, 5-7 Diskussionspunkte, persoenliche Signatur]"),
];

// Kapitel 15: Quellenverzeichnis
const kapitel15 = [
  h1("15. Quellenverzeichnis"),
  p("[Nummerierte Tabelle: Nr. | Quelle | URL]"),
];

// ─── Dokument zusammenbauen ──────────────────────────────────────────────────

const doc = new Document({
  footnotes: {
    1: {
      children: [
        new Paragraph({
          children: [
            r(
              "DSGVO: Datenschutz-Grundverordnung, EU-Verordnung 2016/679, gueltig ab 25. Mai 2018"
            ),
          ],
        }),
      ],
    },
    2: {
      children: [
        new Paragraph({
          children: [
            r(
              "KMU: Kleine und Mittlere Unternehmen, per IfM-Definition bis 499 Mitarbeiter und bis 50 Mio. EUR Jahresumsatz"
            ),
          ],
        }),
      ],
    },
    3: {
      children: [
        new Paragraph({
          children: [
            r(
              "GoBD: Grundsaetze zur ordnungsmaessigen Fuehrung und Aufbewahrung von Buecher, Aufzeichnungen, Unterlagen und Daten, BMF-Schreiben 2019"
            ),
          ],
        }),
      ],
    },
  },
  sections: [
    {
      properties: {
        titlePage: true,
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        first: new Header({ children: [] }),
        default: makeHeader(),
      },
      children: [
        ...deckblattChildren,
        pageBreak(),
        ...kapitel1,
        ...kapitel2,
        ...kapitel3,
        ...kapitel4,
        ...kapitel5,
        ...kapitel6,
        ...kapitel7,
        ...kapitel8,
        ...kapitel9,
        ...kapitel10,
        ...kapitel11,
        ...kapitel12,
        ...kapitel13,
        ...kapitel14,
        ...kapitel15,
      ],
    },
  ],
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 34, font: FONT, color: "1E3A5F" },
        paragraph: { spacing: { before: 300, after: 120 } },
      },
      {
        id: "Heading2",
        name: "heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 26, font: FONT, color: "2E4057" },
        paragraph: { spacing: { before: 200, after: 80 } },
      },
      {
        id: "Heading3",
        name: "heading 3",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 22, font: FONT, color: "444444" },
        paragraph: { spacing: { before: 160, after: 60 } },
      },
    ],
  },
});

// ─── Ausgabe ─────────────────────────────────────────────────────────────────

if (!fs.existsSync("public")) fs.mkdirSync("public");

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(PROJECT.outputFile, buffer);
console.log("Dokument erstellt:", PROJECT.outputFile);
console.log("Naechste Schritte:");
console.log("  1. Dokument oeffnen und pruefen");
console.log("  2. Zahlen und Quellen verifizieren");
console.log("  3. Zur Freigabe einreichen");
