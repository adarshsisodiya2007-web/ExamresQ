export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Top Bar
    brandTagline: 'Resilient Online Assessment Terminal',
    candidateRole: 'Candidate Workspace',
    officerRole: 'Officer Command Hub',
    langToggle: 'हिंदी',
    
    // Status & Traffic Lights
    allNormal: 'All Normal (Safe)',
    savingSafely: 'Saving in Buffer (No Action Needed)',
    attentionRequired: 'Attention Required',
    connected: 'Online • Sync Active',
    disconnected: 'Network Interrupted • Answers 100% Protected',
    
    // Student Actions
    saveAndNext: 'Save & Next',
    markForReview: 'Mark for Review',
    clearResponse: 'Clear Response',
    submitExam: 'Final Submit Exam',
    needHelp: '✋ Need Assistance',
    timeLeft: 'Time Remaining',
    question: 'Question',
    of: 'of',
    
    // Question Palette Legend
    answered: 'Answered',
    notAnswered: 'Not Answered',
    marked: 'Marked for Review',
    notVisited: 'Not Visited',
    
    // Help Request Modal
    helpTitle: 'Candidate Assistance & Exam Hall Requests',
    helpSubtitle: 'Select a request. The room invigilator will attend to your desk immediately.',
    roughPaper: 'Need Extra Rough Sheet',
    roughPaperDesc: 'Invigilator will deliver official stamped rough paper to your station.',
    water: 'Drinking Water Assistance',
    waterDesc: 'Water boy/invigilator will bring drinking water to your desk.',
    techIssue: 'Computer / Mouse Malfunction',
    techIssueDesc: 'Exam lab technician will inspect your terminal or switch backup hardware.',
    callInvigilator: 'Call Room Invigilator',
    callInvigilatorDesc: 'Request the teacher/invigilator to visit your workstation for general query.',
    requestDispatched: 'Request dispatched to Invigilator Terminal!',
    
    // Motion Sensor
    motionAlert: '⚠️ MOTION SENSOR TRIGGER: Excessive movement detected! Please remain facing your screen.',
    motionMeter: 'Motion Activity',
    
    // Attendance & Verification
    attendanceSheet: 'Official Attendance Roll Sheet',
    markPresent: 'Present',
    markAbsent: 'Absent',
    aadharVerified: 'Aadhaar ID Checked',
    photoVerified: 'Photo Matched',
    roughIssued: 'Rough Sheet Given',
    printSheet: 'Print Attendance Sheet',
    
    // Submission Receipt
    submissionReceiptTitle: 'National Assessment Submission Acknowledgement',
    submissionConfirmed: 'Exam Successfully Submitted & Cryptographically Sealed',
    totalAttempted: 'Questions Attempted',
    unattempted: 'Unattempted',
    submissionTime: 'Official Submission Time',
    printReceipt: 'Download / Print Official Receipt',
    closeReceipt: 'Return to Terminal Home'
  },
  hi: {
    // Top Bar
    brandTagline: 'सुरक्षित एवं विश्वसनीय ऑनलाइन परीक्षा प्रणाली',
    candidateRole: 'परीक्षार्थी कार्यक्षेत्र',
    officerRole: 'निरीक्षक कमांड केंद्र',
    langToggle: 'English',
    
    // Status & Traffic Lights
    allNormal: '🟢 सब सामान्य है (सुरक्षित)',
    savingSafely: '🟡 धीमा नेटवर्क (उत्तर सुरक्षित सहेजे जा रहे हैं)',
    attentionRequired: '🔴 तुरंत ध्यान दें',
    connected: 'ऑनलाइन • सीधा संपर्क सक्रिय',
    disconnected: 'इंटरनेट बंद • चिंता न करें, आपका पेपर 100% सुरक्षित है',
    
    // Student Actions
    saveAndNext: 'सहेजें और आगे बढ़ें (Save & Next)',
    markForReview: 'समीक्षा के लिए चिह्नित करें',
    clearResponse: 'उत्तर हटाएं (Clear)',
    submitExam: 'परीक्षा अंतिम जमा करें (Submit)',
    needHelp: '✋ सहायता चाहिए (Help)',
    timeLeft: 'बचा हुआ समय',
    question: 'प्रश्न',
    of: 'का',
    
    // Question Palette Legend
    answered: 'उत्तर दिया गया',
    notAnswered: 'उत्तर नहीं दिया गया',
    marked: 'समीक्षा हेतु चिह्नित',
    notVisited: 'अभी तक नहीं देखा',
    
    // Help Request Modal
    helpTitle: 'छात्र सहायता एवं परीक्षा कक्ष अनुरोध',
    helpSubtitle: 'अपनी आवश्यकता चुनें। कक्ष निरीक्षक (Teacher) तुरंत आपकी डेस्क पर आएंगे।',
    roughPaper: 'अतिरिक्त रफ शीट चाहिए (Rough Paper)',
    roughPaperDesc: 'निरीक्षक आपकी डेस्क पर मुहर लगी आधिकारिक रफ शीट लेकर आएंगे।',
    water: 'पीने का पानी चाहिए (Water)',
    waterDesc: 'सहायक आपकी डेस्क पर पीने का स्वच्छ पानी लाएगा।',
    techIssue: 'कंप्यूटर या माउस समस्या (Hardware Glitch)',
    techIssueDesc: 'लैब तकनीशियन तुरंत आपकी मशीन की जांच करेगा या बैकअप सिस्टम देगा।',
    callInvigilator: 'कक्ष निरीक्षक को बुलाएं (Call Teacher)',
    callInvigilatorDesc: 'किसी भी प्रश्न या समस्या हेतु शिक्षक को अपनी सीट पर बुलाएं।',
    requestDispatched: 'अनुरोध निरीक्षक को सफलतापूर्वक भेज दिया गया है!',
    
    // Motion Sensor
    motionAlert: '⚠️ गति संवेदक चेतावनी: अत्यधिक हिलना-डुलना पाया गया! कृपया शांत बैठकर स्क्रीन देखें।',
    motionMeter: 'शरीर गति सूचकांक',
    
    // Attendance & Verification
    attendanceSheet: 'आधिकारिक उपस्थिति पत्रक (Attendance Sheet)',
    markPresent: 'उपस्थित (Present)',
    markAbsent: 'अनुपस्थित (Absent)',
    aadharVerified: 'आधार कार्ड सत्यापित',
    photoVerified: 'फोटो का मिलान हुआ',
    roughIssued: 'रफ शीट प्रदान की गई',
    printSheet: 'उपस्थिति पत्रक प्रिंट करें',
    
    // Submission Receipt
    submissionReceiptTitle: 'राष्ट्रीय परीक्षा जमा पावती (Submission Receipt)',
    submissionConfirmed: 'परीक्षा सफलतापूर्वक जमा और डिजिटल मुहर से सील हो चुकी है',
    totalAttempted: 'कुल हल किए गए प्रश्न',
    unattempted: 'छोड़े गए प्रश्न',
    submissionTime: 'जमा करने का आधिकारिक समय',
    printReceipt: 'पावती प्रिंट / डाउनलोड करें',
    closeReceipt: 'मुख्य पृष्ठ पर लौटें'
  }
};
