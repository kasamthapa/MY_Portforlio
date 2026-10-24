import type { FlowNode, ProjectFlowDefinition } from './components/ProjectSystemFlow'

const node = (id: string, title: string, detail: string, kind: string, x: number, y: number, mobileX: number, mobileY: number): FlowNode => ({ id, title, detail, kind, x, y, mobileX, mobileY })

// Maps describe the implemented paths in the local project sources, audited
// 2026-10-24. They intentionally omit unverified deployment/runtime claims.
// CodeBrain: server/src/{controllers/codebrain.controller,services/*}.ts
// Critch: server/src/controllers/project.controller.ts + utils/notify.ts
// SikshyaNepal: app/(main)/colleges + app/api/{colleges/compare,saved-colleges,admission-planner}
// Rapporteur: server/src/lib/{analyzeMeeting,transcriptParser,verifyEvidence}.ts
export const projectSystemFlows: Record<string, ProjectFlowDefinition> = {
  codebrain: {
    id: 'codebrain', name: 'CodeBrain', mobileHeight: 590,
    nodes: [
      node('repo', 'GitHub repository', 'Public repository URL', 'INPUT', 18, 52, 16, 30),
      node('fragments', 'Code fragments', 'JS / TS · file + lines', 'PARSE', 266, 52, 228, 30),
      node('index', 'Search index', 'Embeddings · pgvector', 'STORE', 514, 52, 228, 180),
      node('question', 'Your question', 'Plain-language query', 'INPUT', 18, 288, 16, 330),
      node('matches', 'Code matches', 'Up to five fragments', 'RETRIEVE', 266, 288, 228, 330),
      node('answer', 'Answer builder', 'Question + code → AI', 'GENERATE', 514, 288, 228, 480),
      node('sources', 'Answer + sources', 'Stream · file + lines', 'OUTPUT', 762, 288, 16, 480),
    ],
    edges: [
      { id: 'repo-fragments', from: 'repo', to: 'fragments', path: 'M194 87 H266', mobilePath: 'M192 65 H228' },
      { id: 'fragments-index', from: 'fragments', to: 'index', path: 'M442 87 H514', mobilePath: 'M316 100 V180' },
      { id: 'index-matches', from: 'index', to: 'matches', path: 'M602 122 V202 H354 V288', mobilePath: 'M316 250 V330', label: 'search saved code', labelX: 426, labelY: 188 },
      { id: 'question-matches', from: 'question', to: 'matches', path: 'M194 323 H266', mobilePath: 'M192 365 H228' },
      { id: 'matches-answer', from: 'matches', to: 'answer', path: 'M442 323 H514', mobilePath: 'M316 400 V480' },
      { id: 'answer-sources', from: 'answer', to: 'sources', path: 'M690 323 H762', mobilePath: 'M228 515 H192' },
    ],
    steps: [
      { title: 'Start with a repository', description: 'Paste a public GitHub URL. CodeBrain fetches its source files.', nodes: ['repo'], edges: [] },
      { title: 'Give the code structure', description: 'JavaScript and TypeScript become fragments that retain their file paths and line ranges.', nodes: ['repo', 'fragments'], edges: ['repo-fragments'] },
      { title: 'Build a searchable index', description: 'Embeddings and code fragments are stored together in PostgreSQL with pgvector.', nodes: ['fragments', 'index'], edges: ['fragments-index'] },
      { title: 'Find the relevant code', description: 'Your question searches the saved index for up to five closest code fragments.', nodes: ['question', 'index', 'matches'], edges: ['question-matches', 'index-matches'] },
      { title: 'Write from the retrieved context', description: 'The question and matched fragments go to the answer builder as source context.', nodes: ['matches', 'answer'], edges: ['matches-answer'] },
      { title: 'Follow the explanation to its source', description: 'The answer streams into the browser with file and line references to check.', nodes: ['answer', 'sources'], edges: ['answer-sources'] },
    ],
  },
  sikshyanepal: {
    id: 'sikshyanepal', name: 'SikshyaNepal', mobileHeight: 600,
    nodes: [
      node('search', 'Student search', 'Course · place · level', 'INPUT', 18, 52, 16, 30),
      node('directory', 'Filter directory', 'Narrow the options', 'SEARCH', 266, 52, 228, 30),
      node('profile', 'College profile', 'Source + verification', 'EXPLORE', 514, 52, 16, 180),
      node('compare', 'Compare options', 'Up to three colleges', 'COMPARE', 762, 52, 16, 340),
      node('records', 'Sourced records', 'Colleges + programs', 'CATALOG', 266, 288, 228, 180),
      node('saved', 'Saved colleges', 'Private shortlist', 'YOUR ACCOUNT', 514, 288, 228, 340),
      node('notices', 'Admission notices', 'Open official source', 'CHECK DETAILS', 762, 288, 16, 490),
      node('planner', 'Admission planner', 'Documents + status', 'YOUR ACCOUNT', 18, 288, 228, 490),
    ],
    edges: [
      { id: 'search-directory', from: 'search', to: 'directory', path: 'M194 87 H266', mobilePath: 'M192 65 H228' },
      { id: 'records-directory', from: 'records', to: 'directory', path: 'M354 288 V122', mobilePath: 'M316 180 V100', label: 'catalog', labelX: 367, labelY: 212, mobileLabelX: 327, mobileLabelY: 146 },
      { id: 'directory-profile', from: 'directory', to: 'profile', path: 'M442 87 H514', mobilePath: 'M228 65 H210 V215 H192' },
      { id: 'profile-compare', from: 'profile', to: 'compare', path: 'M690 87 H762', mobilePath: 'M104 250 V340' },
      { id: 'profile-saved', from: 'profile', to: 'saved', path: 'M602 122 V288', mobilePath: 'M192 215 H214 V375 H228', label: 'save', labelX: 616, labelY: 226 },
      { id: 'profile-notices', from: 'profile', to: 'notices', path: 'M690 87 H725 V224 H850 V288', mobilePath: 'M16 215 H4 V525 H16', label: 'admissions', labelX: 741, labelY: 210 },
      { id: 'notices-planner', from: 'notices', to: 'planner', path: 'M850 358 V405 H106 V358', mobilePath: 'M192 525 H228', label: 'track your application', labelX: 371, labelY: 392 },
    ],
    steps: [
      { title: 'Find a direction', description: 'Search by course, location, or study level to start narrowing your options.', nodes: ['search', 'directory'], edges: ['search-directory'] },
      { title: 'Search the catalog', description: 'The directory filters college and program records into a relevant set of choices.', nodes: ['records', 'directory'], edges: ['records-directory'] },
      { title: 'Look behind a listing', description: 'Open a college profile and inspect its source links and verification state.', nodes: ['directory', 'profile'], edges: ['directory-profile'] },
      { title: 'Compare your choices', description: 'Compare up to three colleges, including their programs, reviews, and scholarships.', nodes: ['profile', 'compare'], edges: ['profile-compare'] },
      { title: 'Keep a private shortlist', description: 'Save promising colleges to your own account so you can return to them.', nodes: ['profile', 'saved'], edges: ['profile-saved'] },
      { title: 'Confirm the current details', description: 'Read a published admission notice and follow its official source before applying.', nodes: ['profile', 'notices'], edges: ['profile-notices'] },
      { title: 'Track the application', description: 'Add the admission to your private planner to track documents, deadlines, and status.', nodes: ['notices', 'planner'], edges: ['notices-planner'] },
    ],
  },
  critch: {
    id: 'critch', name: 'Critch', mobileHeight: 600,
    nodes: [
      node('project', 'Share project', 'Screenshot + links', 'PUBLISH', 18, 52, 16, 30),
      node('feed', 'Public feed', 'Searchable project', 'DISCOVER', 266, 52, 228, 30),
      node('review', 'Peer review', 'Idea · UI · code · docs', 'FEEDBACK', 514, 52, 228, 180),
      node('checks', 'Review checks', 'No self / duplicates', 'VALIDATE', 762, 52, 16, 180),
      node('saved', 'Review saved', 'Database transaction', 'TRANSACTION', 762, 288, 16, 340),
      node('rating', 'Project rating', 'Updated average', 'RECALCULATE', 514, 288, 228, 340),
      node('reputation', 'Owner reputation', 'Received review score', 'RECALCULATE', 266, 288, 228, 490),
      node('notification', 'Owner notified', 'Saved + live update', 'SOCKET.IO', 18, 288, 16, 490),
    ],
    edges: [
      { id: 'project-feed', from: 'project', to: 'feed', path: 'M194 87 H266', mobilePath: 'M192 65 H228' },
      { id: 'feed-review', from: 'feed', to: 'review', path: 'M442 87 H514', mobilePath: 'M316 100 V180' },
      { id: 'review-checks', from: 'review', to: 'checks', path: 'M690 87 H762', mobilePath: 'M228 215 H192' },
      { id: 'checks-saved', from: 'checks', to: 'saved', path: 'M850 122 V288', mobilePath: 'M104 250 V340', label: 'valid review', labelX: 862, labelY: 214, mobileLabelX: 117, mobileLabelY: 302 },
      { id: 'saved-rating', from: 'saved', to: 'rating', path: 'M762 323 H690', mobilePath: 'M192 375 H228' },
      { id: 'saved-reputation', from: 'saved', to: 'reputation', path: 'M762 323 H738 V204 H354 V288', mobilePath: 'M104 410 V450 H316 V490', label: 'recalculate', labelX: 498, labelY: 190 },
      { id: 'saved-notification', from: 'saved', to: 'notification', path: 'M850 358 V405 H106 V358', mobilePath: 'M104 410 V490', label: 'notify owner', labelX: 389, labelY: 392 },
    ],
    steps: [
      { title: 'Put your work in front of people', description: 'Publish a project with its screenshot, links, description, and tags.', nodes: ['project'], edges: [] },
      { title: 'Make the project discoverable', description: 'The project appears in a searchable public feed for other makers to explore.', nodes: ['project', 'feed'], edges: ['project-feed'] },
      { title: 'Get specific feedback', description: 'A peer reviews the idea, interface, code, and documentation with ratings and a comment.', nodes: ['feed', 'review'], edges: ['feed-review'] },
      { title: 'Check who is reviewing', description: 'The server rejects self-reviews and repeat reviews before accepting the feedback.', nodes: ['review', 'checks'], edges: ['review-checks'] },
      { title: 'Save the review safely', description: 'A valid review is written inside a database transaction.', nodes: ['checks', 'saved'], edges: ['checks-saved'] },
      { title: 'Update the scores together', description: 'Received reviews recalculate the project average and the owner’s reputation.', nodes: ['saved', 'rating', 'reputation'], edges: ['saved-rating', 'saved-reputation'] },
      { title: 'Tell the owner', description: 'A notification is saved and sent live to the project owner through Socket.IO.', nodes: ['saved', 'notification'], edges: ['saved-notification'] },
    ],
  },
  rapporteur: {
    id: 'rapporteur', name: 'Rapporteur', mobileHeight: 600,
    nodes: [
      node('meeting', 'Agenda + transcript', 'Paste meeting text', 'INPUT', 18, 52, 16, 30),
      node('lines', 'Numbered lines', 'Speaker + timestamp', 'PARSE', 266, 52, 228, 30),
      node('draft', 'AI draft', 'Decisions + actions', 'EXTRACT', 514, 52, 228, 180),
      node('structure', 'Structure check', 'Validate the result', 'VALIDATE', 762, 52, 16, 180),
      node('quotes', 'Quote check', 'Match the named line', 'EVIDENCE', 762, 288, 16, 340),
      node('notes', 'Agenda notes', 'Evidence badges', 'OUTPUT', 514, 288, 228, 340),
      node('offagenda', 'Off-agenda notes', 'Keep extra discussion', 'OUTPUT', 266, 288, 16, 490),
      node('source', 'Source transcript', 'Line + timestamp', 'TRACE', 18, 288, 228, 490),
    ],
    edges: [
      { id: 'meeting-lines', from: 'meeting', to: 'lines', path: 'M194 87 H266', mobilePath: 'M192 65 H228' },
      { id: 'lines-draft', from: 'lines', to: 'draft', path: 'M442 87 H514', mobilePath: 'M316 100 V180' },
      { id: 'draft-structure', from: 'draft', to: 'structure', path: 'M690 87 H762', mobilePath: 'M228 215 H192' },
      { id: 'structure-retry', from: 'structure', to: 'draft', path: 'M850 52 V18 H602 V52', mobilePath: 'M104 180 V140 H316 V180', label: 'invalid? retry once', labelX: 624, labelY: 10, mobileLabelX: 139, mobileLabelY: 130 },
      { id: 'structure-quotes', from: 'structure', to: 'quotes', path: 'M850 122 V288', mobilePath: 'M104 250 V340' },
      { id: 'quotes-notes', from: 'quotes', to: 'notes', path: 'M762 323 H690', mobilePath: 'M192 375 H228' },
      { id: 'quotes-offagenda', from: 'quotes', to: 'offagenda', path: 'M850 358 V393 H354 V358', mobilePath: 'M104 410 V490', label: 'separate off-agenda', labelX: 493, labelY: 380 },
      { id: 'notes-source', from: 'notes', to: 'source', path: 'M602 288 V204 H106 V288', mobilePath: 'M316 410 V490', label: 'select a claim', labelX: 271, labelY: 190 },
      { id: 'offagenda-source', from: 'offagenda', to: 'source', path: 'M266 323 H194', mobilePath: 'M192 525 H228' },
    ],
    steps: [
      { title: 'Bring the meeting text', description: 'Paste the transcript and add an agenda, or let Rapporteur infer the topics.', nodes: ['meeting'], edges: [] },
      { title: 'Make the discussion traceable', description: 'The parser turns speaker turns into numbered lines with timestamps.', nodes: ['meeting', 'lines'], edges: ['meeting-lines'] },
      { title: 'Draft useful meeting notes', description: 'AI extracts summaries, decisions, and actions from the numbered transcript.', nodes: ['lines', 'draft'], edges: ['lines-draft'] },
      { title: 'Check the draft’s structure', description: 'The server validates the result and retries an invalid draft once.', nodes: ['draft', 'structure'], edges: ['draft-structure', 'structure-retry'] },
      { title: 'Check the quoted evidence', description: 'Each quoted claim is compared with its named transcript line; a quote match earns a verification badge.', nodes: ['structure', 'quotes'], edges: ['structure-quotes'] },
      { title: 'Keep both sides of the conversation', description: 'Agenda notes and off-agenda discussion remain available with their evidence status.', nodes: ['quotes', 'notes', 'offagenda'], edges: ['quotes-notes', 'quotes-offagenda'] },
      { title: 'Return to the original words', description: 'Select a decision or action to jump to the transcript line behind it.', nodes: ['notes', 'offagenda', 'source'], edges: ['notes-source', 'offagenda-source'] },
    ],
  },
}
