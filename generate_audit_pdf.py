import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page

        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#7F1D2D"))
        self.drawString(54, 11 * inch - 36, "EXAMRESQ — 11-REQUIREMENT COMPLIANCE & GAP AUDIT REPORT")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "CONFIDENTIAL & INDEPENDENT EVALUATION")
        
        # Top Rule
        self.setStrokeColor(colors.HexColor("#E2C2BB"))
        self.setLineWidth(0.75)
        self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Bottom Rule & Page Number
        self.line(54, 45, 8.5 * inch - 54, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(54, 32, "Resilient & Trustworthy Online Assessment Ecosystem • October 2026")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 32, page_str)
        self.restoreState()

def build_audit_pdf(filename="ExamResQ_11_Requirement_Compliance_Audit.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#B91C3C")     # Crimson
    PRIMARY_DARK = colors.HexColor("#7F1D2D")# Dark Maroon
    DARK_BG = colors.HexColor("#0D1527")     # Midnight Navy
    TEXT_DARK = colors.HexColor("#0F172A")   # Slate 900
    TEXT_MUTED = colors.HexColor("#475569")  # Slate 600
    BORDER_LIGHT = colors.HexColor("#F0D9D4")# Warm Rose
    BG_LIGHT = colors.HexColor("#FFF8F5")    # Warm Blush
    ACCENT_GREEN = colors.HexColor("#16803C")# Emerald
    ACCENT_AMBER = colors.HexColor("#C28A1E")# Amber

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=PRIMARY_DARK,
        alignment=0
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=TEXT_MUTED,
        alignment=0
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=21,
        textColor=PRIMARY_DARK,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=DARK_BG,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=body_style,
        fontSize=8.5,
        leading=12,
        textColor=PRIMARY_DARK
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white,
        alignment=1
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=TEXT_DARK
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold'
    )

    badge_full = ParagraphStyle(
        'BadgeFull',
        parent=table_cell,
        fontName='Helvetica-Bold',
        fontSize=7,
        textColor=colors.HexColor("#16803C"),
        alignment=1
    )

    badge_partial = ParagraphStyle(
        'BadgePartial',
        parent=table_cell,
        fontName='Helvetica-Bold',
        fontSize=7,
        textColor=colors.HexColor("#B45309"),
        alignment=1
    )

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("EXAMRESQ", ParagraphStyle('PreTitle', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=PRIMARY, spaceAfter=8)))
    story.append(Paragraph("11-Requirement Compliance &amp; Gap Audit", title_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Resilient &amp; Trustworthy Online Assessment Ecosystem", subtitle_style))
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=3, color=PRIMARY, spaceAfter=20))

    # Executive Overview Box on Cover
    meta_data = [
        [Paragraph("<b>Audit Date:</b>", table_cell), Paragraph("October 07, 2026", table_cell), Paragraph("<b>Overall Compliance:</b>", table_cell), Paragraph("<b>75.0% (Strong Partial)</b>", table_cell_bold)],
        [Paragraph("<b>Target System:</b>", table_cell), Paragraph("ExamResQ Prototype v2.4", table_cell), Paragraph("<b>Final Verdict:</b>", table_cell), Paragraph("<font color='#B45309'><b>ALMOST READY</b></font>", table_cell_bold)],
        [Paragraph("<b>Audit Framework:</b>", table_cell), Paragraph("11 Ecosystem Mandates", table_cell), Paragraph("<b>Audited Requirements:</b>", table_cell), Paragraph("11 of 11 Examined", table_cell)],
        [Paragraph("<b>Auditor Roles:</b>", table_cell), Paragraph("Product Auditor, Solution Architect, QA &amp; Evaluation Panel", table_cell), Paragraph("<b>Status Distribution:</b>", table_cell), Paragraph("3 FULL / 8 PARTIAL / 0 MISSING", table_cell)]
    ]
    meta_table = Table(meta_data, colWidths=[1.3*inch, 2.2*inch, 1.4*inch, 2.1*inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 25))

    # Executive Summary Abstract on Cover
    story.append(Paragraph("<b>EXECUTIVE MANDATE &amp; CONTEXT</b>", h2_style))
    story.append(Paragraph(
        "This independent compliance audit rigorously evaluates the current ExamResQ application against the "
        "11 core requirements mandated for high-stakes, resilient digital assessments. The audit inspects concrete source code, "
        "local state machines, client cryptographic operations, computer-vision proctoring pipelines, mesh networking services, "
        "and operator decision consoles. Features represented purely through static data or decorative UI are unvarnished and "
        "classified as partial demonstrations rather than production completions. This report establishes the exact implementation "
        "baseline and provides an actionable engineering roadmap to achieve 100% compliance.",
        body_style
    ))
    story.append(Spacer(1, 15))

    # Score Summary KPI Cards
    kpi_data = [
        [
            Paragraph("<font size='16' color='#16803C'><b>3</b></font><br/><b>FULL COMPLIANCE</b><br/>Fully Demonstrated", table_cell),
            Paragraph("<font size='16' color='#B45309'><b>8</b></font><br/><b>PARTIAL COMPLIANCE</b><br/>Functional / Mock Split", table_cell),
            Paragraph("<font size='16' color='#B91C3C'><b>0</b></font><br/><b>UNADDRESSED</b><br/>Completely Missing", table_cell),
            Paragraph("<font size='16' color='#7F1D2D'><b>75.0%</b></font><br/><b>WEIGHTED SCORE</b><br/>High Competitive Tier", table_cell)
        ]
    ]
    kpi_table = Table(kpi_data, colWidths=[1.75*inch, 1.75*inch, 1.75*inch, 1.75*inch])
    kpi_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(kpi_table)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 1: EXECUTIVE SUMMARY
    # =========================================================================
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))
    story.append(Paragraph(
        "ExamResQ presents an exceptionally strong, well-architected solution prototype tailored for hackathon judging and "
        "educational board procurement. Unlike traditional prototypes that rely strictly on static mockups, ExamResQ incorporates "
        "real, operational frontend capabilities: real-time in-browser TensorFlow object detection (COCO-SSD), real-time Web Audio API "
        "acoustic leak analysis, peer-to-peer WebRTC / BroadcastChannel multi-terminal mesh sync, responsive offline-safe state management, "
        "and complete incident lifecycle decision consoles.",
        body_style
    ))
    story.append(Paragraph(
        "However, when audited under strict institutional compliance rules (where features cannot be presumed complete solely from "
        "UI representations or simulated client datasets), 8 out of 11 requirements fall into the <b>PARTIAL</b> category. "
        "The primary compliance bottlenecks stem from the absence of a live persistent cloud backend database (PostgreSQL/Redis), "
        "simulated rather than cryptographic Merkle-tree recalculations on actual storage bytes, and hardcoded early-warning risk prediction arrays.",
        body_style
    ))

    summary_points = [
        [Paragraph("<b>Core Strengths:</b>", table_cell_bold), Paragraph("• Active in-browser AI computer vision &amp; audio proctoring without external server dependency.<br/>• Zero-panic candidate communication during outages (timer freeze, offline buffer notification).<br/>• Real multi-terminal mesh discovery across tabs and laptops with live camera frames.<br/>• Exceptional human-centric governance (invigilator review queues rather than blind AI disqualifications).", table_cell)],
        [Paragraph("<b>Key Weaknesses:</b>", table_cell_bold), Paragraph("• Early prediction probabilities (84%, 62%) are hardcoded mock arrays rather than rolling ML models.<br/>• Merkle root ledger &amp; IndexedDB encryption are demonstrated through client state rather than hardened cryptographic storage.<br/>• Reconciliation engine runs on memory objects rather than reconciling real local storage deltas against server logs.<br/>• Cross-centre aggregate telemetry (38 test centres) is static mock data.", table_cell)],
        [Paragraph("<b>Top 5 Gap Priorities:</b>", table_cell_bold), Paragraph("<b>1. (P0)</b> Connect live rolling time-series calculations to the Early Detection Risk Dashboard.<br/><b>2. (P0)</b> Implement genuine WebCrypto SHA-256 Merkle root hashing on the candidate answer dictionary.<br/><b>3. (P1)</b> Wire IndexedDB persistence to survive full browser/tab process crashes.<br/><b>4. (P1)</b> Link incident escalation webhooks to real external dispatch endpoints (e.g. simulated server socket).<br/><b>5. (P1)</b> Export downloadable official PDF audit certificates directly from the Audit Trust explorer.", table_cell)]
    ]
    sum_table = Table(summary_points, colWidths=[1.8*inch, 5.2*inch])
    sum_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(sum_table)

    story.append(Spacer(1, 10))

    # =========================================================================
    # SECTION 2: REQUIREMENT COMPLIANCE MATRIX
    # =========================================================================
    story.append(Paragraph("2. Requirement Compliance Matrix", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))

    matrix_rows = [
        [
            Paragraph("<b>#</b>", table_header),
            Paragraph("<b>Requirement Description</b>", table_header),
            Paragraph("<b>Status</b>", table_header),
            Paragraph("<b>Score</b>", table_header),
            Paragraph("<b>Evidence Module</b>", table_header),
            Paragraph("<b>Primary Gap</b>", table_header),
            Paragraph("<b>P</b>", table_header)
        ],
        [
            Paragraph("01", table_cell_bold),
            Paragraph("Real-Time Monitoring", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("75%", table_cell_bold),
            Paragraph("LiveCandidateMonitor,<br/>multiCandidateMeshService", table_cell),
            Paragraph("Cross-centre stats (38 centres) are static mock objects.", table_cell),
            Paragraph("P1", table_cell_bold)
        ],
        [
            Paragraph("02", table_cell_bold),
            Paragraph("Early Detection &amp; Prediction", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("50%", table_cell_bold),
            Paragraph("EarlyDetectionDashboard,<br/>initialPredictiveCentres", table_cell),
            Paragraph("Prediction scores (84%, 62%) are hardcoded, not computed.", table_cell),
            Paragraph("P0", table_cell_bold)
        ],
        [
            Paragraph("03", table_cell_bold),
            Paragraph("Automated Incident Escalation", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("75%", table_cell_bold),
            Paragraph("IncidentCenter,<br/>ResilienceContext", table_cell),
            Paragraph("Incidents lifecycle simulated via state, no real external webhooks.", table_cell),
            Paragraph("P1", table_cell_bold)
        ],
        [
            Paragraph("04", table_cell_bold),
            Paragraph("Backup &amp; Disaster Recovery", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("75%", table_cell_bold),
            Paragraph("RecoveryCenter,<br/>ResponseProtectionWidget", table_cell),
            Paragraph("Client sandbox uses memory/localStorage instead of hardened IndexedDB.", table_cell),
            Paragraph("P1", table_cell_bold)
        ],
        [
            Paragraph("05", table_cell_bold),
            Paragraph("Secure Tamper-Evident Storage", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("50%", table_cell_bold),
            Paragraph("AuditTrust,<br/>sampleAuditTrail", table_cell),
            Paragraph("Tamper detection button is a scripted event, not crypto check on DB.", table_cell),
            Paragraph("P0", table_cell_bold)
        ],
        [
            Paragraph("06", table_cell_bold),
            Paragraph("Intelligent Suspicious Patterns", table_cell),
            Paragraph("FULL", badge_full),
            Paragraph("100%", table_cell_bold),
            Paragraph("AIProctoringHUD,<br/>SuspiciousPatternCenter", table_cell),
            Paragraph("Fully demonstrable with live TF COCO-SSD &amp; human review queue.", table_cell),
            Paragraph("P2", table_cell_bold)
        ],
        [
            Paragraph("07", table_cell_bold),
            Paragraph("Automated Reconciliation", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("50%", table_cell_bold),
            Paragraph("ReconciliationCenter,<br/>sampleReconciliationRecords", table_cell),
            Paragraph("Reconciliation engine runs on mock state array rather than DB deltas.", table_cell),
            Paragraph("P1", table_cell_bold)
        ],
        [
            Paragraph("08", table_cell_bold),
            Paragraph("Candidate Communication", table_cell),
            Paragraph("FULL", badge_full),
            Paragraph("100%", table_cell_bold),
            Paragraph("LiveExam, NotificationToast,<br/>StudentAssistanceModal", table_cell),
            Paragraph("Complete dynamic two-way communication and non-alarming UI.", table_cell),
            Paragraph("P3", table_cell_bold)
        ],
        [
            Paragraph("09", table_cell_bold),
            Paragraph("Rescheduling Decision Support", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("75%", table_cell_bold),
            Paragraph("DecisionSupportCenter,<br/>sampleDecisionSupportRecords", table_cell),
            Paragraph("Action sign-off exists; recommendations derived from mock incidents.", table_cell),
            Paragraph("P1", table_cell_bold)
        ],
        [
            Paragraph("10", table_cell_bold),
            Paragraph("Fairness &amp; Consistency Parity", table_cell),
            Paragraph("FULL", badge_full),
            Paragraph("100%", table_cell_bold),
            Paragraph("ResilienceContext, LiveExam,<br/>DecisionSupportCenter", table_cell),
            Paragraph("Automated timer freeze, parity credit, and grievance resolution active.", table_cell),
            Paragraph("P2", table_cell_bold)
        ],
        [
            Paragraph("11", table_cell_bold),
            Paragraph("Post-Exam Audit &amp; Reporting", table_cell),
            Paragraph("PARTIAL", badge_partial),
            Paragraph("75%", table_cell_bold),
            Paragraph("Reports, AuditTrust,<br/>SubmissionReceiptModal", table_cell),
            Paragraph("Complete on-screen audit ledger and receipt; lacks native PDF export.", table_cell),
            Paragraph("P1", table_cell_bold)
        ]
    ]

    mat_table = Table(matrix_rows, colWidths=[0.3*inch, 1.8*inch, 0.75*inch, 0.5*inch, 1.55*inch, 1.8*inch, 0.3*inch])
    mat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_BG),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (2,0), (3,-1), 'CENTER'),
        ('ALIGN', (-1,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(mat_table)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: DETAILED REQUIREMENT AUDIT (REQUIREMENTS 1 TO 11)
    # =========================================================================
    story.append(Paragraph("3. Detailed Requirement Audit", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))

    reqs_detail = [
        {
            "num": 1,
            "title": "Real-Time Monitoring",
            "compliance": "PARTIALLY COMPLIANT (Strong Partial)",
            "score": "75%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "ExamResQ provides operational visibility across active student workstations. In LiveCandidateMonitor, administrators view candidate statuses (🟢 Safe vs 🟡 Review), roll numbers, station IDs, answering progress, and live video feeds. The custom multiCandidateMeshService uses browser BroadcastChannel and WebRTC PeerJS to automatically discover candidate tabs on the same computer or across networked laptops.",
            "verified": "Verified LiveCandidateMonitor, multiCandidateMeshService, CCTV Wall mode, and Stations table. Verified Outage Simulation switches station to 'Offline Buffered' in real-time.",
            "what_missing": "The wider network view in CentreMonitoring and OperationsDashboard presents hardcoded data for 38 regional centres rather than live gateway pings. True discovery across non-local network subnets requires an active WebRTC turn/signaling server.",
            "impact": "Judges testing multi-tab local scenarios see genuine real-time capabilities, but enterprise evaluators will detect that regional centre metrics are pre-baked.",
            "recommendation": "Maintain the local mesh for demo reliability, but implement a lightweight simulated WebSocket telemetry stream generating jitter and latency fluctuations for the 38 background test centres."
        },
        {
            "num": 2,
            "title": "Early Detection and Prediction",
            "compliance": "PARTIALLY COMPLIANT",
            "score": "50%",
            "priority": "P0 — Critical",
            "color": "#B45309",
            "what_exists": "EarlyDetectionDashboard provides a dedicated risk view classifying centres by risk level (Critical, High, Moderate), stability scores, jitter metrics, and specific observed indicators (e.g. 5 latency spikes >210ms over 45 min). Each centre features preventive recommendations (e.g. switch to standby fiber uplink).",
            "verified": "Verified EarlyDetectionDashboard, risk filtering, and preventive advisory dispatch notifications.",
            "what_missing": "<b>Prediction capability is currently represented visually through static data and requires implementation.</b> Disruption probabilities (84%, 62%) and stability scores are hardcoded in initialPredictiveCentres rather than calculated via rolling statistical analysis of incoming pings.",
            "impact": "If an evaluator inspects whether the system actually predicts failure before it happens, they will find that numbers are pre-populated rather than computed from real-time network trends.",
            "recommendation": "Implement a client-side rolling buffer tracking network ping times during the exam. When standard deviation of latency exceeds a threshold, dynamically compute and display a predictive risk probability."
        },
        {
            "num": 3,
            "title": "Automated Incident Detection, Classification and Escalation",
            "compliance": "PARTIALLY COMPLIANT (Strong Partial)",
            "score": "75%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "IncidentCenter contains an incident lifecycle tracker: Detected → Classified → Escalated → Mitigating → Resolved. Incidents are categorized (Server Failure, Network Failure, Power Failure) with severity badges, sub-second audit timelines, and root cause descriptions. Notifications are broadcast to admin and candidate channels via ResilienceContext.",
            "verified": "Verified IncidentCenter timeline milestones, escalation target assignment ('Both', 'Centre Supervisor'), and notification toasts.",
            "what_missing": "Incident triggering is tied to the manual 'Simulate Outage' button rather than autonomous watchdog heartbeats. Escalations trigger internal React state toasts instead of external webhooks or emails.",
            "impact": "The workflow is visually complete and demonstrable, but lacks autonomous triggering from background error thresholds.",
            "recommendation": "Add an autonomous heartbeat monitor in ResilienceContext that automatically triggers an incident if ping latency or packet loss crosses predefined threshold parameters."
        },
        {
            "num": 4,
            "title": "Backup and Disaster Recovery",
            "compliance": "PARTIALLY COMPLIANT (Strong Partial)",
            "score": "75%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "RecoveryCenter showcases the 6-Phase resilience lifecycle. During an outage, the candidate's responses lock into ResponseProtectionWidget with an encrypted state hash. The exam timer freezes immediately, and upon reconnection, delta synchronization restores connectivity with zero response loss. A Controlled Resumption modal allows invigilator verification.",
            "verified": "Verified ResponseProtectionWidget 6-stage lifecycle, Simulate Outage / Restore Network toggle, timer freeze, and Controlled Resume approval modal.",
            "what_missing": "The client sandbox stores encrypted payloads in React state and localStorage rather than a dedicated, persistent IndexedDB store with physical cryptographic key pairs. Multi-tier disaster fallback is demonstrated with mock records.",
            "impact": "If a student closes their entire browser window during an outage (rather than just losing network), sessionStorage may reset unless saved into persistent IndexedDB.",
            "recommendation": "Wrap answer persistence with idb-keyval to write every selected answer directly to browser IndexedDB with a local timestamp and SHA-256 seal."
        },
        {
            "num": 5,
            "title": "Secure and Tamper-Evident Data Storage",
            "compliance": "PARTIALLY COMPLIANT",
            "score": "50%",
            "priority": "P0 — Critical",
            "color": "#B45309",
            "what_exists": "AuditTrust displays a Merkle root hash (0x7f9a842b...), candidate integrity scores (100%), and immutable audit access logs. It includes an interactive 'Simulate Tamper' button that simulates an unauthorized SQL injection attempt, immediately flags 'TAMPER_PREVENTED', and logs an access violation.",
            "verified": "Verified AuditTrust interface, Merkle root display, access logs table, and 'Simulate Tamper' test button.",
            "what_missing": "The Merkle root is a static string in sampleAuditTrail rather than dynamically computed from the actual answers object using window.crypto.subtle. The tamper simulation injects a mock log rather than failing a real cryptographic validation.",
            "impact": "Security auditors will recognize that the Merkle tree and WORM locking are conceptual demonstrations rather than mathematical validations over actual data.",
            "recommendation": "Implement an actual WebCrypto function that hashes the candidate's answers object on every save and displays the real computed SHA-256 hash in the UI."
        },
        {
            "num": 6,
            "title": "Intelligent Identification of Suspicious Patterns",
            "compliance": "FULLY COMPLIANT",
            "score": "100%",
            "priority": "P2 — Medium",
            "color": "#16803C",
            "what_exists": "AIProctoringHUD runs real-time TensorFlow COCO-SSD object detection directly in the browser via webcam, detecting cell phones, multiple persons, face absence, and gaze deviation. It integrates Web Audio API to detect voice/speech noise (>65 dB) and optical flow canvas analysis for sudden physical movement. Crucially, it adheres to ethical guidelines: it flags suspicious behavior for human invigilator review rather than issuing automated disqualifications.",
            "verified": "Verified live COCO-SSD loading, bounding boxes on webcam, microphone audio levels, motion scores, strike counters, and routing to the invigilator review queue in LiveCandidateMonitor.",
            "what_missing": "Cross-examination longitudinal pattern correlation across different test sessions uses demonstration datasets.",
            "impact": "Exceeds standard hackathon prototypes by running real computer vision and acoustics locally without API costs.",
            "recommendation": "Maintain current architecture; add a simple toggle allowing evaluators without webcams to use a simulated proctoring feed if permissions are denied."
        },
        {
            "num": 7,
            "title": "Automated Reconciliation and Validation",
            "compliance": "PARTIALLY COMPLIANT",
            "score": "50%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "ReconciliationCenter compares client-side saved response counts against cloud-received submissions. It displays mismatch statuses (Delayed Sync, Packet Drop, Exact Match). An interactive 'Run Reconciliation' button simulates a cross-system validation run, updating all records to 'Verified Reconciled' with Merkle seal confirmation.",
            "verified": "Verified ReconciliationCenter comparison table, discrepancy filter, and 'Run Reconciliation' engine execution.",
            "what_missing": "Reconciliation operates on an in-memory mock record array rather than performing a binary or JSON delta comparison between client storage and server logs.",
            "impact": "Demonstrates the concept and operational workflow clearly, but the matching engine is not yet connected to a live multi-node database.",
            "recommendation": "Connect the reconciliation button to compare the candidate's actual local answers count against the server's received answers count in ResilienceContext."
        },
        {
            "num": 8,
            "title": "Candidate Communication and Real-Time Status Updates",
            "compliance": "FULLY COMPLIANT",
            "score": "100%",
            "priority": "P3 — Low",
            "color": "#16803C",
            "what_exists": "LiveExam and ResponseProtectionWidget provide clear, anxiety-reducing status communication. During disruptions, candidates see an immediate status change ('Connection Lost — Responses Protected Locally'), the exam timer freezes, and an informative compensatory credit badge appears. Candidates can request assistance (rough paper, water, tech support) via StudentAssistanceModal, and receive officer broadcast messages instantly via NotificationToast.",
            "verified": "Verified live response protection widget, offline status transitions, help request modal, and two-way broadcast announcement toast system.",
            "what_missing": "None for prototype and pilot compliance.",
            "impact": "Superb candidate experience that directly satisfies the core requirement of transparent, reassuring communication.",
            "recommendation": "Maintain existing design; current implementation is presentation-ready."
        },
        {
            "num": 9,
            "title": "Decision Support for Rescheduling or Re-conducting",
            "compliance": "PARTIALLY COMPLIANT (Strong Partial)",
            "score": "75%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "DecisionSupportCenter assists authorities in answering whether an interrupted exam can safely continue. It provides impact metrics (180 candidates affected, 100% data recovery, 1m 45s outage duration) and concrete system recommendations: 'Resume with Parity', 'Extend by 5m', 'Reschedule', or 'Re-conduct'. An official sign-off modal records administrative approvals with rationale and timestamps.",
            "verified": "Verified DecisionSupportCenter, recommendation cards, official sign-off modal, and administrative authorization logging.",
            "what_missing": "Recommendations are based on predefined mock scenario properties rather than an automated algorithmic score assessing response loss percentages in real time.",
            "impact": "Strong operational demonstration that proves ExamResQ understands the complex administrative dilemma of post-disruption governance.",
            "recommendation": "Create a simple dynamic scoring rule: if data loss = 0% and duration < 5m → recommend 'Resume with Parity'; if data loss > 10% → recommend 'Re-conduct'."
        },
        {
            "num": 10,
            "title": "Fairness and Consistency During Disruptions",
            "compliance": "FULLY COMPLIANT",
            "score": "100%",
            "priority": "P2 — Medium",
            "color": "#16803C",
            "what_exists": "ExamResQ protects candidates from unfair penalties caused by technical faults. The system freezes candidate exam timers during outages and automatically calculates compensatory time credit (+compensatoryTimeAdded) upon recovery. Invigilators can grant +5m parity compensation with one click. Infrastructure events (network drops) are strictly segregated from cheating strikes, ensuring technical failures never result in penalties. A student grievance resolution workflow is included.",
            "verified": "Verified automatic timer freeze, compensatory parity calculation, manual +5m parity grant button, grievance ticket resolution, and separation of technical vs proctoring alerts.",
            "what_missing": "None. The requirement is deeply embedded across both candidate and officer workflows.",
            "impact": "Exemplary fulfillment of candidate equity and parity mandates.",
            "recommendation": "Highlight this feature prominently in presentations, as fairness during outages is a major judging criteria."
        },
        {
            "num": 11,
            "title": "Post-Examination Audit Trail & Evidence Reporting",
            "compliance": "PARTIALLY COMPLIANT (Strong Partial)",
            "score": "75%",
            "priority": "P1 — High",
            "color": "#B45309",
            "what_exists": "Reports and AuditTrust generate a comprehensive audit trail detailing session history, timestamps, answered counts, integrity percentages, and Merkle root hashes. Upon submission in LiveExam, SubmissionReceiptModal produces an immutable digital receipt with verification tokens and integrity certificates.",
            "verified": "Verified Reports summary, AuditTrust event history table, and SubmissionReceiptModal verification tokens.",
            "what_missing": "Reports are displayed on screen but lack a one-click 'Download Official PDF Report' button to generate exportable files for external review boards.",
            "impact": "Judges and evaluators who expect a physical/PDF audit dossier will find that reports are currently constrained to the browser DOM.",
            "recommendation": "Add a client-side PDF export button (using jsPDF or the backend report generator) to export the session audit trail as a downloadable PDF document."
        }
    ]

    for req in reqs_detail:
        req_box = [
            [
                Paragraph(f"<b>REQUIREMENT {req['num']:02d}: {req['title'].upper()}</b>", table_cell_bold),
                Paragraph(f"<font color='{req['color']}'><b>{req['compliance']} ({req['score']})</b></font>", table_cell_bold),
                Paragraph(f"<b>Priority:</b> {req['priority']}", table_cell)
            ],
            [
                Paragraph("<b>Current Implementation:</b>", table_cell_bold),
                Paragraph(req['what_exists'], table_cell),
                Paragraph(f"<b>Verified In:</b><br/>{req['verified']}", table_cell)
            ],
            [
                Paragraph("<font color='#B91C3C'><b>Identified Gap:</b></font>", table_cell_bold),
                Paragraph(f"<font color='#7F1D2D'>{req['what_missing']}</font>", table_cell),
                Paragraph(f"<b>Impact:</b><br/>{req['impact']}", table_cell)
            ],
            [
                Paragraph("<b>Actionable Recommendation:</b>", table_cell_bold),
                Paragraph(f"<b>{req['recommendation']}</b>", table_cell),
                Paragraph("<b>Next Sprint</b>", table_cell_bold)
            ]
        ]
        t = Table(req_box, colWidths=[1.5*inch, 3.8*inch, 1.7*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        story.append(t)
        story.append(Spacer(1, 8))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 4: END-TO-END INCIDENT SIMULATION (15-STEP LIFECYCLE)
    # =========================================================================
    story.append(Paragraph("4. End-to-End Incident Simulation Audit", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))
    story.append(Paragraph(
        "A critical test of an assessment resilience platform is its ability to handle a complete end-to-end incident lifecycle "
        "without human panic or data loss. The table below audits the 15 chronological steps of an exam disruption.",
        body_style
    ))

    sim_steps = [
        [Paragraph("<b>Step</b>", table_header), Paragraph("<b>Expected Behavior</b>", table_header), Paragraph("<b>Current ExamResQ Implementation</b>", table_header), Paragraph("<b>Status</b>", table_header), Paragraph("<b>Required Action</b>", table_header)],
        [Paragraph("1", table_cell_bold), Paragraph("Candidate starts exam", table_cell), Paragraph("CandidateVerificationModal sets student station, roll, and biometrics.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Seamless start.", table_cell)],
        [Paragraph("2", table_cell_bold), Paragraph("Candidate answers questions", table_cell), Paragraph("LiveExam updates active question, answers record, and SHA-256 seal.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Answers persist in context.", table_cell)],
        [Paragraph("3", table_cell_bold), Paragraph("Network disruption occurs", table_cell), Paragraph("'Simulate Outage' button severs connection; offline flag engaged.", table_cell), Paragraph("WORKING", badge_full), Paragraph("Add autonomous heartbeat trigger.", table_cell)],
        [Paragraph("4", table_cell_bold), Paragraph("Incident detected sub-second", table_cell), Paragraph("Uplink drop flagged in 1.2s; networkStatus switches to 'disconnected'.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Telemetry registers event.", table_cell)],
        [Paragraph("5", table_cell_bold), Paragraph("Incident classified &amp; prioritized", table_cell), Paragraph("IncidentCenter records '#INC-2026-NET-402' (High Severity).", table_cell), Paragraph("PARTIAL", badge_partial), Paragraph("Link dynamic trigger to incident log.", table_cell)],
        [Paragraph("6", table_cell_bold), Paragraph("Administrator notified", table_cell), Paragraph("NotificationToast alerts officer room; station turns amber in monitor.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Alert is instant.", table_cell)],
        [Paragraph("7", table_cell_bold), Paragraph("Candidate receives status update", table_cell), Paragraph("ResponseProtectionWidget shows 'Connection Lost — Responses Protected'.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Clear, non-alarming UX.", table_cell)],
        [Paragraph("8", table_cell_bold), Paragraph("State checkpointed locally", table_cell), Paragraph("Responses held in local ledger with cryptographic hash display.", table_cell), Paragraph("PARTIAL", badge_partial), Paragraph("Store in persistent IndexedDB store.", table_cell)],
        [Paragraph("9", table_cell_bold), Paragraph("Recovery initiated", table_cell), Paragraph("'Restore Network' engages secondary route switchover.", table_cell), Paragraph("WORKING", badge_full), Paragraph("Add auto-retry polling reconnect.", table_cell)],
        [Paragraph("10", table_cell_bold), Paragraph("State restored &amp; synced", table_cell), Paragraph("Protection stage moves to 'Synchronizing'; offline queue flushes to 0.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Delta sync resolves.", table_cell)],
        [Paragraph("11", table_cell_bold), Paragraph("Integrity validated mathematically", table_cell), Paragraph("Status transitions to 'Response Verified: 0% Data Loss'.", table_cell), Paragraph("PARTIAL", badge_partial), Paragraph("Recalculate dynamic Merkle root.", table_cell)],
        [Paragraph("12", table_cell_bold), Paragraph("Candidate resumes with parity", table_cell), Paragraph("Exam timer unfreezes; compensatory time (+seconds) added automatically.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Fairness achieved.", table_cell)],
        [Paragraph("13", table_cell_bold), Paragraph("Event logged in audit trail", table_cell), Paragraph("CandidateTelemetryEvent '#evt-2' logged with timestamp.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Appears in audit ledger.", table_cell)],
        [Paragraph("14", table_cell_bold), Paragraph("Administrator reviews outcome", table_cell), Paragraph("DecisionSupportCenter allows sign-off on parity and session extension.", table_cell), Paragraph("WORKING", badge_full), Paragraph("None. Full sign-off modal.", table_cell)],
        [Paragraph("15", table_cell_bold), Paragraph("Audit report generated", table_cell), Paragraph("SubmissionReceiptModal displays digital certificate upon exam submit.", table_cell), Paragraph("PARTIAL", badge_partial), Paragraph("Add physical PDF export trigger.", table_cell)]
    ]

    sim_table = Table(sim_steps, colWidths=[0.3*inch, 1.6*inch, 2.2*inch, 0.8*inch, 2.1*inch])
    sim_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_BG),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (3,0), (3,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(sim_table)

    story.append(Spacer(1, 12))

    # =========================================================================
    # SECTION 5: SECURITY & TRUST AUDIT
    # =========================================================================
    story.append(Paragraph("5. Security, Trust &amp; Governance Audit", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))
    sec_points = [
        [Paragraph("<b>Audit Dimension</b>", table_header), Paragraph("<b>Observed Implementation</b>", table_header), Paragraph("<b>Security Risk / Gap</b>", table_header), Paragraph("<b>Hardening Action</b>", table_header)],
        [Paragraph("<b>Data Integrity</b>", table_cell_bold), Paragraph("SHA-256 block hashes and Merkle root displays in AuditTrust and ResponseProtectionWidget.", table_cell), Paragraph("Hashes are computed in JavaScript state rather than signed with an asymmetric private key.", table_cell), Paragraph("Generate Ed25519 WebCrypto keypair during student verification.", table_cell)],
        [Paragraph("<b>Access Control (RBAC)</b>", table_cell_bold), Paragraph("OfficerLoginModal with PIN '2026'; role switching restricted in UI.", table_cell), Paragraph("Authentication is stored in localStorage ('examresq_officer_auth'); no backend JWT verification.", table_cell), Paragraph("Implement session expiry token in sessionStorage.", table_cell)],
        [Paragraph("<b>Tamper Evidence</b>", table_cell_bold), Paragraph("Interactive 'Simulate Tamper' test button appends an access violation log.", table_cell), Paragraph("Simulated log rather than rejection of a genuine memory write mutation.", table_cell), Paragraph("Store hashed checkpoints in Object.freeze() state arrays.", table_cell)],
        [Paragraph("<b>Candidate Fairness</b>", table_cell_bold), Paragraph("Automatic clock pause, compensatory time parity, and grievance resolution tickets.", table_cell), Paragraph("Parity calculation is client-side; could theoretically be manipulated if unsealed.", table_cell), Paragraph("Officer must sign off on compensatory time grants (already implemented).", table_cell)],
        [Paragraph("<b>AI Ethical Proctoring</b>", table_cell_bold), Paragraph("TensorFlow vision &amp; audio alerts route to human invigilator review queue.", table_cell), Paragraph("Lighting changes can cause transient false-positive look-away frames.", table_cell), Paragraph("Maintain the 15-frame debounce filter (already in AIProctoringHUD).", table_cell)]
    ]
    sec_table = Table(sec_points, colWidths=[1.3*inch, 2.0*inch, 1.9*inch, 1.8*inch])
    sec_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_DARK),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(sec_table)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 6 & 7: UX AUDIT & ACTIONABLE BACKLOG
    # =========================================================================
    story.append(Paragraph("6. UX &amp; Hackathon Demonstration Audit", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))
    story.append(Paragraph(
        "ExamResQ demonstrates exceptional UX design for competitive presentations. The user interface achieves high judge-readiness "
        "through balanced whitespace, crisp typography, and disciplined dummy data (strictly limited to 3 items per entity). "
        "Screens communicate their story within 3 to 5 seconds without developer jargon. The 2-minute pitch demonstration flow "
        "is immediately compelling: <i>1. Start Exam → 2. Pull plug / Simulate Outage → 3. Show timer freeze &amp; protected local ledger → 4. Restore Network → 5. Show zero loss &amp; audit receipt.</i>",
        body_style
    ))
    story.append(Spacer(1, 6))

    story.append(Paragraph("7. Missing Features — Actionable Engineering Backlog", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))

    backlog_items = [
        [Paragraph("<b>P</b>", table_header), Paragraph("<b>Feature Name</b>", table_header), Paragraph("<b>Target Module</b>", table_header), Paragraph("<b>Why Needed for Compliance</b>", table_header), Paragraph("<b>Actionable Implementation Steps</b>", table_header)],
        [
            Paragraph("P0", table_cell_bold),
            Paragraph("Dynamic Latency Risk Scoring", table_cell_bold),
            Paragraph("EarlyDetectionDashboard", table_cell),
            Paragraph("Req 2: Prediction must not be hardcoded static data.", table_cell),
            Paragraph("Record rolling ping latency array in ResilienceContext; calculate standard deviation; compute risk probability = min(95, std_dev * 1.8).", table_cell)
        ],
        [
            Paragraph("P0", table_cell_bold),
            Paragraph("Live WebCrypto SHA-256 Hashing", table_cell_bold),
            Paragraph("ResponseProtectionWidget, AuditTrust", table_cell),
            Paragraph("Req 5: Mathematical proof of answer tamper-evidence.", table_cell),
            Paragraph("Call window.crypto.subtle.digest('SHA-256', JSON.stringify(answers)) on every option click; display real hex string.", table_cell)
        ],
        [
            Paragraph("P1", table_cell_bold),
            Paragraph("Persistent IndexedDB Storage", table_cell_bold),
            Paragraph("ResilienceContext, LiveExam", table_cell),
            Paragraph("Req 4: Protect against browser/tab crash during outage.", table_cell),
            Paragraph("Use idb-keyval to write answers to indexedDB store 'examresq_answers' on every save; restore on mount.", table_cell)
        ],
        [
            Paragraph("P1", table_cell_bold),
            Paragraph("Client-to-Server Reconciliation Diff", table_cell_bold),
            Paragraph("ReconciliationCenter", table_cell),
            Paragraph("Req 7: Real validation of local vs remote deltas.", table_cell),
            Paragraph("Compare Object.keys(answers).length against mock cloud submitted count; show true reconciliation diff.", table_cell)
        ],
        [
            Paragraph("P1", table_cell_bold),
            Paragraph("PDF Audit Dossier Export", table_cell_bold),
            Paragraph("Reports, AuditTrust", table_cell),
            Paragraph("Req 11: Exportable proof for government audit boards.", table_cell),
            Paragraph("Add 'Download Official Audit Dossier' button in Reports triggering print-friendly HTML/PDF export.", table_cell)
        ],
        [
            Paragraph("P2", table_cell_bold),
            Paragraph("Autonomous Outage Watchdog", table_cell_bold),
            Paragraph("ResilienceContext", table_cell),
            Paragraph("Req 3: Incidents should trigger from background watchdog.", table_cell),
            Paragraph("Add an optional 'Autonomous Watchdog Mode' toggle that simulates network dropout after 45 seconds of exam activity.", table_cell)
        ],
        [
            Paragraph("P3", table_cell_bold),
            Paragraph("Webcam Permission Fallback Simulator", table_cell_bold),
            Paragraph("AIProctoringHUD", table_cell),
            Paragraph("Req 6: Allow presentation when webcam is disabled/blocked.", table_cell),
            Paragraph("If navigator.mediaDevices.getUserMedia fails, fallback to looping sample proctoring canvas with demo detection boxes.", table_cell)
        ]
    ]

    back_table = Table(backlog_items, colWidths=[0.3*inch, 1.5*inch, 1.4*inch, 1.8*inch, 2.0*inch])
    back_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_BG),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(back_table)

    story.append(Spacer(1, 10))

    # =========================================================================
    # SECTION 8 & 9: ROADMAP & FINAL VERDICT
    # =========================================================================
    story.append(Paragraph("8. Implementation Roadmap", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))

    roadmap_data = [
        [Paragraph("<b>PHASE 1: Critical Compliance (Sprint 1)</b>", table_cell_bold), Paragraph("• Implement real WebCrypto SHA-256 hashing for student answers.<br/>• Connect dynamic variance calculation to Early Detection Dashboard risk probabilities.<br/>• Store answers in IndexedDB alongside React context.", table_cell)],
        [Paragraph("<b>PHASE 2: Strong Demonstration (Sprint 2)</b>", table_cell_bold), Paragraph("• Connect Reconciliation Center to actual candidate answers delta.<br/>• Add one-click official PDF report export in Reports &amp; AuditTrust.<br/>• Provide demo fallback video loop for AI Proctoring if webcam blocked.", table_cell)],
        [Paragraph("<b>PHASE 3: Production Hardening (Future Pilot)</b>", table_cell_bold), Paragraph("• Multi-region WebSocket signaling cluster for nationwide peer-to-peer mesh.<br/>• Hardware Security Module (HSM) digital signatures for submission receipts.<br/>• Formal institutional API integrations with NTA / State Board enrollment databases.", table_cell)]
    ]
    road_table = Table(roadmap_data, colWidths=[2.2*inch, 4.8*inch])
    road_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(road_table)

    story.append(Spacer(1, 12))

    story.append(Paragraph("9. Final Audit Verdict", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))

    verdict_data = [
        [
            Paragraph("<font size='14' color='#B45309'><b>VERDICT: ALMOST READY (75.0% COMPLIANT)</b></font>", table_cell_bold)
        ],
        [
            Paragraph(
                "ExamResQ demonstrates a world-class concept, stellar visual execution, and genuinely functional frontend innovations "
                "(real-time TensorFlow proctoring, Web Audio decibel meters, BroadcastChannel mesh synchronization, and active timer parity). "
                "It is not yet graded 'FULLY READY' because 8 of the 11 requirements currently rely on mock datasets or simulated client state "
                "for backend operations (risk prediction scores, Merkle root verification, and reconciliation deltas). "
                "Executing the 2 P0 items (Dynamic Risk Scoring and Real WebCrypto Hashing) will instantly elevate ExamResQ to a near-flawless, "
                "unassailable hackathon-winning submission.",
                body_style
            )
        ]
    ]
    verdict_table = Table(verdict_data, colWidths=[7.0*inch])
    verdict_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#F59E0B")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(verdict_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated: {filename}")

if __name__ == '__main__':
    out_file = "ExamResQ_11_Requirement_Compliance_Audit.pdf"
    build_audit_pdf(out_file)
