-- Mock quiz data for DevLingo demo
-- Quiz categories: Internet, Hardware, Software
-- Difficulties: Easy, Medium, Hard

DELETE FROM user_progress;
DELETE FROM questions;
DELETE FROM terms;
DELETE FROM lessons;

INSERT INTO lessons
(id, title, category, difficulty, description, orderIndex, isPublished)
VALUES
(1, 'Internet - Easy', 'Internet', 'Easy', 'Easy Internet quiz for demo data.', 1, 1),
(2, 'Internet - Medium', 'Internet', 'Medium', 'Medium Internet quiz for demo data.', 2, 1),
(3, 'Internet - Hard', 'Internet', 'Hard', 'Hard Internet quiz for demo data.', 3, 1),

(4, 'Hardware - Easy', 'Hardware', 'Easy', 'Easy Hardware quiz for demo data.', 4, 1),
(5, 'Hardware - Medium', 'Hardware', 'Medium', 'Medium Hardware quiz for demo data.', 5, 1),
(6, 'Hardware - Hard', 'Hardware', 'Hard', 'Hard Hardware quiz for demo data.', 6, 1),

(7, 'Software - Easy', 'Software', 'Easy', 'Easy Software quiz for demo data.', 7, 1),
(8, 'Software - Medium', 'Software', 'Medium', 'Medium Software quiz for demo data.', 8, 1),
(9, 'Software - Hard', 'Software', 'Hard', 'Hard Software quiz for demo data.', 9, 1);

INSERT INTO terms
(id, lessonId, termName, definition, slangExplanation, example)
VALUES
(1, 1, 'Cc', 'An email field used to send a copy of an email to additional recipients.', 'Copy recipient field.', 'Put your teammate in Cc so they receive a copy of the email.'),
(2, 2, 'IMAP', 'Internet Message Access Protocol, used for accessing email from a mail server.', 'Email access protocol.', 'A mail app can use IMAP to read email from the server.'),
(3, 3, 'Ajax', 'Asynchronous JavaScript and XML, a technique for loading data without refreshing the whole page.', 'Background web request technique.', 'Ajax can update part of a webpage after calling an API.'),

(4, 4, 'Esc', 'Short for Escape, a keyboard key often used to cancel or exit an action.', 'Cancel key.', 'Press Esc to close a dialog.'),
(5, 5, 'iPod', 'A portable media player first released by Apple in 2001.', 'Apple music player.', 'The first iPod was released in 2001.'),
(6, 6, 'DMA', 'Direct Memory Access, a feature that allows hardware to transfer data without constantly using the CPU.', 'Memory transfer that bypasses the CPU.', 'DMA can move data between memory and a device efficiently.'),

(7, 7, 'Toolbar', 'A row or group of buttons for common actions, usually located near the top of a window.', 'Button bar in an app.', 'The toolbar may contain Save, Undo, and Search buttons.'),
(8, 8, 'File', 'A named electronic document or data item stored on a computer.', 'Electronic document.', 'A PDF document is stored as a file.'),
(9, 9, 'Interpreter', 'A program that reads, parses, and runs script code.', 'Script runner.', 'A JavaScript engine can interpret and run JavaScript code.');

INSERT INTO questions
(id, lessonId, termId, questionText, optionA, optionB, optionC, optionD, correctOption, xpReward)
VALUES
(1, 1, 1,
'What is the email field used for copying recipients called?',
'Subject',
'Cc',
'Attachment',
'Inbox',
'B',
10),

(2, 2, 2,
'The IMAP protocol is used for what Internet service?',
'Web browsing',
'Email access',
'File compression',
'Domain name lookup',
'B',
15),

(3, 3, 3,
'What do the letters in "Ajax" stand for?',
'Advanced Java and XML',
'Asynchronous JavaScript and XML',
'Automatic JSON and XHTML',
'Applied JavaScript Extension',
'B',
20),

(4, 4, 4,
'The letters on the "Esc" key are an abbreviation for what?',
'Escape',
'Escort',
'Execute',
'Exchange',
'A',
10),

(5, 5, 5,
'When was the first iPod released?',
'1998',
'2001',
'2007',
'2010',
'B',
15),

(6, 6, 6,
'What acronym describes memory transfers that bypass the CPU?',
'Direct Memory Access',
'Dynamic Memory Allocation',
'Digital Module Adapter',
'Data Mapping Array',
'A',
20),

(7, 7, 7,
'The toolbar is typically located in what part of a window?',
'Bottom',
'Top',
'Desktop only',
'Inside the recycle bin',
'B',
10),

(8, 8, 8,
'What term describes an electronic document?',
'File',
'Folder',
'Shortcut',
'Driver',
'A',
15),

(9, 9, 9,
'Which of the following can parse a script?',
'Firewall',
'Interpreter',
'Spreadsheet',
'Image editor',
'B',
20);