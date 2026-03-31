import myavatar    from '../images/myself.png';

export const ME = {
  id:       'me',
  name:     'Sujay',
  status:   'online',
  color:    '#4f46e5',
  initials: 'SU',
  avatar:   myavatar,
};

export const CONTACTS = [
  {
    id:       'aruG',
    name:     'Arun Tej',
    status:   'online',      
    color:    '#db2777',
    initials: 'AT',
    avatar:   null,
  },
  {
    id:       'VinR',
    name:     'Vinod Reddy',
    status:   'away',        
    color:    '#d97706',
    initials: 'VR',
    avatar:   null,
  },
  {
    id:       'AbhiT',
    name:     'Abhiram T',
    status:   'offline',     
    color:    '#0d9488',
    initials: 'AT',
    avatar:   null,
  },
  {
    id:       'sah',
    name:     'Sahil Gupta',
    status:   'offline',     
    color:    '#0d9488',
    initials: 'SG',
    avatar:   null,
  },
  {
    id:       'RitRoh',
    name:     'Ritvik Rohan',
    status:   'away',     
    color:    '#db2777',
    initials: 'RR',
    avatar:   null,
  },
  {
    id:       'PrajK',
    name:     'Prajwal K',
    status:   'offline',     
    color:    '#0d9488',
    initials: 'PK',
    avatar:   null,
  },
  {
    id:       'PavD',
    name:     'Pavan D',
    status:   'online',     
    color:    '#db2777',
    initials: 'PD',
    avatar:   null,
  },
  {
    id:       'KisS',
    name:     'Kishore S',
    status:   'offline',     
    color:    '#0d9488',
    initials: 'KS',
    avatar:   null,
  },

];

const ts = (offsetMinutes) =>
  new Date(Date.now() - offsetMinutes * 60000).toISOString();

export const INITIAL_THREADS = {
  aruG: [
    { id: 'a1', senderId: 'aruG', content: 'Hi, Arun here, What`s up?', timestamp: ts(50), status: 'read' },
    { id: 'a2', senderId: 'me',    content: 'Hi, are you attending the meeting today? ', timestamp: ts(48), status: 'read' },
    { id: 'a3', senderId: 'aruG', content: 'No, i dont think so, I have got an doctor appointment today.', timestamp: ts(45), status: 'read' },
    { id: 'a4', senderId: 'me',    content: 'Okay no problem, Have a good day', timestamp: ts(43), status: 'read' },
    { id: 'a5', senderId: 'aruG', content: 'alright, see you later.', timestamp: ts(40), status: 'read' },
  ],
  VinR: [
    { id: 'b1', senderId: 'VinR',   content: "Hello! How are you?", timestamp: ts(130), status: 'read' },
    { id: 'b2', senderId: 'me',    content: 'Hello! I`m good how are you?', timestamp: ts(128), status: 'read' },
    { id: 'b3', senderId: 'VinR',   content: 'Nice to hear it from you, When are the holidays?', timestamp: ts(124), status: 'read' },
    { id: 'b4', senderId: 'me',    content: 'Holidays starts from May 9th, What about you?', timestamp: ts(120), status: 'delivered' },
    { id: 'b5', senderId: 'VinR',   content: "Still not announced,  i'll let you know.", timestamp: ts(118), status: 'read' },
  ],
  AbhiT: [
    { id: 'c1', senderId: 'me',    content: 'hey abhi!, you free this weekend? ', timestamp: ts(1450), status: 'read' },
    { id: 'c2', senderId: 'AbhiT',  content: 'hey! yeah Saturday, I`m free ', timestamp: ts(1435), status: 'read' },
    { id: 'c3', senderId: 'me',    content: "awesome, let's plan something this time", timestamp: ts(1430), status: 'read' },
    { id: 'c4', senderId: 'AbhiT',  content: 'yes! How about a trip to Vellore.', timestamp: ts(1425), status: 'read' },
    { id: 'c5', senderId: 'me',    content: 'Okay , Sound`s great. ', timestamp: ts(1420), status: 'read' },
  ],
};
