{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // js/app.js\
\
// --- M\'d3DULOS ---\
// Importamos funcionalidades de nuestros otros archivos JS.\
import \{ supabase, onAuthStateChanged, updateUserUI \} from './auth.js';\
import \{ loadStudentData, saveStudentProgress, logActivity \} from './database.js';\
\
// ==================================================================\
// =========== PARTE 1: BASE DE DATOS DE EJERCICIOS (Tu c\'f3digo) ===========\
// ==================================================================\
// Aqu\'ed se almacena todo el contenido de los ejercicios. No se ha modificado.\
const exercisesDataPart1 = [ \{ topic: 'Health', items: [ \{ id: 1, description: 'Some people do this when they feel really sad or sick.', word: 'cry', hint: 'This action often comes with tears.'\}, \{ id: 2, description: 'You can take this when you have a terrible headache.', word: 'medicine', hint: 'A doctor prescribes this to help you feel better.'\}, \{ id: 3, description: 'You need to see this person when you are sick or hurt.', word: 'doctor', hint: 'This person works in a hospital or clinic.'\}, \{ id: 4, description: 'You can go to this place when your body isn\\'t OK.', word: 'hospital', hint: 'This is a large building with many doctors and nurses.'\}, \{ id: 5, description: 'You can have this when you eat too much.', word: 'stomach-ache', hint: 'This is a pain in your belly.'\}, \{ id: 6, description: 'An illness that makes you sneeze and have a runny nose.', word: 'cold', hint: 'It\\'s a very common illness, especially in winter.' \}, \{ id: 7, description: 'A sudden, noisy expulsion of air from the lungs.', word: 'cough', hint: 'You often do this when your throat is irritated.' \} ], allWords: [ \{ word: 'cry', image: 'https://storage.googleapis.com/gemini-prod/images/5f0f353f-7e10-47b2-a4e9-1199343c5f49.png', sentence: 'Babies often *cry* when they are hungry.' \}, \{ word: 'medicine', image: 'https://storage.googleapis.com/gemini-prod/images/0b459424-69d2-43ce-9a7c-3b983796f7c1.png', sentence: 'The doctor gives you *medicine* to feel better.' \}, \{ word: 'doctor', image: 'https://storage.googleapis.com/gemini-prod/images/3f12440b-71a2-4752-9b2f-7622c7a52145.png', sentence: 'A *doctor* works in a hospital.' \}, \{ word: 'hospital', image: 'https://storage.googleapis.com/gemini-prod/images/735c917b-4860-4ddf-a91c-8e3100652611.png', sentence: 'Ambulances take people to the *hospital*.' \}, \{ word: 'stomach-ache', image: 'https://storage.googleapis.com/gemini-prod/images/99321c1f-36f4-4a4b-8199-3174246ab056.png', sentence: 'If you eat too much candy, you get a *stomach-ache*.' \}, \{ word: 'cold', image: 'https://storage.googleapis.com/gemini-prod/images/3305a303-3e1a-4c91-95c5-847e0d376378.png', sentence: 'When you have a *cold*, you often sneeze.' \}, \{ word: 'cough', image: 'https://storage.googleapis.com/gemini-prod/images/157e1c2e-436f-4424-b159-f9f38f1580aa.png', sentence: 'A *cough* is a noise you make when your throat is irritated.' \} ] \}, \{ topic: 'Places & Activities', items: [ \{ id: 1, description: 'You go here to watch a film.', word: 'cinema' \}, \{ id: 2, description: 'A place with many books you can read or borrow.', word: 'library' \}, \{ id: 3, description: 'The meal you eat in the middle of the day.', word: 'lunch' \}, \{ id: 4, description: 'You can swim here.', word: 'pool' \}, \{ id: 5, description: 'A place where you buy food for your house.', word: 'supermarket' \}, \{ id: 6, description: 'A green area in a city where people can relax or play.', word: 'park' \}, \{ id: 7, description: 'The last meal of the day, eaten in the evening.', word: 'dinner' \} ], allWords: [ \{ word: 'cinema', image: 'https://placehold.co/400x300/a5f3fc/0e7490?text=Cinema', sentence: 'We eat popcorn at the *cinema*.' \}, \{ word: 'library', image: 'https://placehold.co/400x300/d8b4fe/581c87?text=Library', sentence: 'You must be quiet in the *library*.' \}, \{ word: 'lunch', image: 'https://placehold.co/400x300/fde68a/854d0e?text=Lunch', sentence: 'I had a sandwich for *lunch* today.' \}, \{ word: 'pool', image: 'https://placehold.co/400x300/93c5fd/1e40af?text=Pool', sentence: 'It\\'s fun to play in the *pool* on a hot day.' \}, \{ word: 'supermarket', image: 'https://placehold.co/400x300/bef264/3f6212?text=Supermarket', sentence: 'My mom goes to the *supermarket* every Saturday.' \}, \{ word: 'park', image: 'https://placehold.co/400x300/bbf7d0/166534?text=Park', sentence: 'Children love to play in the *park*.' \}, \{ word: 'dinner', image: 'https://placehold.co/400x300/fecdd3/8c2d2d?text=Dinner', sentence: 'Families often eat *dinner* together in the evening.' \} ] \}, \{ topic: 'Animals & Nature', items: [ \{ id: 1, description: 'This animal is known as "man\\'s best friend".', word: 'dog' \}, \{ id: 2, description: 'A very tall plant with a trunk and branches.', word: 'tree' \}, \{ id: 3, description: 'This gives us light and heat during the day.', word: 'sun' \}, \{ id: 4, description: 'A large area of water surrounded by land.', word: 'lake' \}, \{ id: 5, description: 'This insect makes honey.', word: 'bee' \}, \{ id: 6, description: 'A domestic animal that meows.', word: 'cat' \}, \{ id: 7, description: 'A large natural stream of water flowing to the sea.', word: 'river' \} ], allWords: [ \{ word: 'dog', image: 'https://placehold.co/400x300/fecdd3/8c2d2d?text=Dog', sentence: 'My *dog* loves to play fetch.' \}, \{ word: 'tree', image: 'https://placehold.co/400x300/a7f3d0/166534?text=Tree', sentence: 'Birds build their nests in a *tree*.' \}, \{ word: 'sun', image: 'https://placehold.co/400x300/fef08a/854d0e?text=Sun', sentence: 'The *sun* is very bright.' \}, \{ word: 'lake', image: 'https://placehold.co/400x300/cffafe/155e75?text=Lake', sentence: 'You can sail a boat on a *lake*.' \}, \{ word: 'bee', image: 'https://placehold.co/400x300/fef9c3/b45309?text=Bee', sentence: 'A *bee* flies from flower to flower.' \}, \{ word: 'cat', image: 'https://placehold.co/400x300/e9d5ff/581c87?text=Cat', sentence: 'My *cat* likes to sleep all day.' \}, \{ word: 'river', image: 'https://placehold.co/400x300/bae6fd/0c4a6e?text=River', sentence: 'A *river* is a large natural stream of water.' \} ] \}, \{ topic: 'Jobs & Occupations', items: [ \{ id: 1, description: 'This person helps students learn.', word: 'teacher' \}, \{ id: 2, description: 'This person puts out fires.', word: 'firefighter' \}, \{ id: 3, description: 'This person prepares food in a restaurant.', word: 'chef' \}, \{ id: 4, description: 'This person flies airplanes.', word: 'pilot' \}, \{ id: 5, description: 'This person designs buildings.', word: 'architect' \}, \{ id: 6, description: 'A person who performs songs with their voice.', word: 'singer' \}, \{ id: 7, description: 'A person who operates a vehicle.', word: 'driver' \} ], allWords: [ \{ word: 'teacher', image: 'https://placehold.co/400x300/c7d2fe/3730a3?text=Teacher', sentence: 'A *teacher* works in a school.' \}, \{ word: 'firefighter', image: 'https://placehold.co/400x300/fca5a5/991b1b?text=Firefighter', sentence: 'A *firefighter* drives a big red truck.' \}, \{ word: 'chef', image: 'https://placehold.co/400x300/f5f5f5/171717?text=Chef', sentence: 'A *chef* wears a tall white hat.' \}, \{ word: 'pilot', image: 'https://placehold.co/400x300/a5f3fc/164e63?text=Pilot', sentence: 'A *pilot* travels to many countries.' \}, \{ word: 'architect', image: 'https://placehold.co/400x300/e2e8f0/334155?text=Architect', sentence: 'An *architect* draws plans for new houses.' \}, \{ word: 'singer', image: 'https://placehold.co/400x300/f0abfc/86198f?text=Singer', sentence: 'A *singer* performs songs on a stage.' \}, \{ word: 'driver', image: 'https://placehold.co/400x300/fef08a/a16207?text=Driver', sentence: 'A bus *driver* takes people around the city.' \} ] \}, \{ topic: 'Clothing', items: [ \{ id: 1, description: 'You wear this on your head.', word: 'hat' \}, \{ id: 2, description: 'You wear these on your feet.', word: 'shoes' \}, \{ id: 3, description: 'This is a top for the upper part of your body.', word: 'shirt' \}, \{ id: 4, description: 'This is an item of clothing for your legs.', word: 'pants' \}, \{ id: 5, description: 'This is a one-piece garment for women and girls.', word: 'dress' \}, \{ id: 6, description: 'You wear these on your hands when it is cold.', word: 'gloves' \}, \{ id: 7, description: 'This is a long piece of cloth worn around the neck.', word: 'scarf' \} ], allWords: [ \{ word: 'hat', image: 'https://placehold.co/400x300/d9f99d/4d7c0f?text=Hat', sentence: 'A *hat* can protect you from the sun.' \}, \{ word: 'shoes', image: 'https://placehold.co/400x300/a3a3a3/262626?text=Shoes', sentence: 'You need to tie your *shoes*.' \}, \{ word: 'shirt', image: 'https://placehold.co/400x300/fde047/b45309?text=Shirt', sentence: 'He wore a blue *shirt* today.' \}, \{ word: 'pants', image: 'https://placehold.co/400x300/a1a1aa/404040?text=Pants', sentence: 'Jeans are a popular type of *pants*.' \}, \{ word: 'dress', image: 'https://placehold.co/400x300/fbcfe8/9d266f?text=Dress', sentence: 'She wore a beautiful *dress* to the party.' \}, \{ word: 'gloves', image: 'https://placehold.co/400x300/e0e7ff/312e81?text=Gloves', sentence: 'You wear *gloves* on your hands when it is cold.' \}, \{ word: 'scarf', image: 'https://placehold.co/400x300/ffedd5/c2410c?text=Scarf', sentence: 'A *scarf* keeps your neck warm.' \} ] \}, \{ topic: 'Food & Drinks', items: [ \{ id: 1, description: 'This is made from flour and used for sandwiches.', word: 'bread' \}, \{ id: 2, description: 'A yellow or white food made from milk.', word: 'cheese' \}, \{ id: 3, description: 'A round fruit that can be red or green.', word: 'apple' \}, \{ id: 4, description: 'The clear liquid you should drink every day.', word: 'water' \}, \{ id: 5, description: 'A sweet drink made from fruit.', word: 'juice' \}, \{ id: 6, description: 'A grain used as a staple food in many countries.', word: 'rice' \}, \{ id: 7, description: 'A white liquid produced by mammals.', word: 'milk' \} ], allWords: [ \{ word: 'bread', image: 'https://placehold.co/400x300/f59e0b/9a3412?text=Bread', sentence: 'I like to eat toast and *bread* for breakfast.' \}, \{ word: 'cheese', image: 'https://placehold.co/400x300/facc15/ca8a04?text=Cheese', sentence: 'Mice are often said to love *cheese*.' \}, \{ word: 'apple', image: 'https://placehold.co/400x300/ef4444/991b1b?text=Apple', sentence: 'An *apple* a day keeps the doctor away.' \}, \{ word: 'water', image: 'https://placehold.co/400x300/38bdf8/0369a1?text=Water', sentence: 'Plants need *water* to grow.' \}, \{ word: 'juice', image: 'https://placehold.co/400x300/fb923c/ea580c?text=Juice', sentence: 'Orange *juice* is my favorite drink.' \}, \{ word: 'rice', image: 'https://placehold.co/400x300/f3f4f6/4b5563?text=Rice', sentence: '*Rice* is a popular food in many Asian countries.' \}, \{ word: 'milk', image: 'https://placehold.co/400x300/eff6ff/1d4ed8?text=Milk', sentence: 'Cows produce *milk*.' \} ] \} ];\
const exercisesDataPart2 = \{ notices: [ \{ topic: 'Public Places Notices', items: [ \{ id: 1, notice: "PLEASE KEEP OFF THE GRASS", question: "Where can you see this notice?", options: ["In a library.", "In a park.", "In a supermarket."], answer: "B", help: "*Grass* is usually found in outdoor green areas like parks." \}, \{ id: 2, notice: "WET PAINT", question: "Where can you see this notice?", options: ["On a new car.", "On a recently painted wall or bench.", "In a swimming pool."], answer: "B", help: "This is a warning about a surface that is still wet after being *painted*." \}, \{ id: 3, notice: "MIND THE GAP", question: "Where can you see this notice?", options: ["In a cinema.", "In an airplane.", "At a train station."], answer: "C", help: "The *gap* refers to the space between the platform and a train." \}, \{ id: 4, notice: "NO SMOKING", question: "Where can you see this notice?", options: ["In a forest.", "On a farm.", "In a hospital or restaurant."], answer: "C", help: "This rule is enforced in most indoor public buildings for health reasons." \}, \{ id: 5, notice: "FASTEN SEATBELTS", question: "Where can you see this notice?", options: ["In a taxi or on a plane.", "In a school.", "In a shop."], answer: "A", help: "*Seatbelts* are a safety feature in vehicles." \} ]\}, \{ topic: 'School & Office Notices', items: [ \{ id: 1, notice: "QUIET PLEASE, EXAM IN PROGRESS", question: "Where can you see this notice?", options: ["In a playground.", "In a cafeteria.", "In a school hall."], answer: "C", help: "*Exams* take place in educational settings where silence is required." \}, \{ id: 2, notice: "STAFF ONLY BEYOND THIS POINT", question: "Where can you see this notice?", options: ["In a public library.", "Near a private office area.", "At a bus stop."], answer: "B", help: "This notice restricts access to areas meant only for employees or *staff*." \}, \{ id: 3, notice: "PLEASE TURN OFF ALL MOBILE PHONES", question: "Where can you see this notice?", options: ["In a movie theater or library.", "In a park.", "On a street."], answer: "A", help: "Using *mobile phones* can be disruptive in places that require silence." \}, \{ id: 4, notice: "DO NOT LEAVE VALUABLES UNATTENDED", question: "Where can you see this notice?", options: ["In a changing room or library.", "At home.", "In a car."], answer: "A", help: "This is a security warning in public places where personal items might be left alone." \}, \{ id: 5, notice: "PUSH", question: "Where can you see this notice?", options: ["On a window.", "On a door.", "On a light switch."], answer: "B", help: "This is a basic instruction for operating a *door*." \} ]\} ], conversations: [ \{ topic: 'At the Airport', items: [ \{ id: 1, dialogue: ["A: Excuse me, where is the check-in for flight BA249?", "B: It's over there, at desk 12."], question: "Where is the person going?", options: ["To the baggage claim.", "To the check-in desk.", "To the departure gate."], answer: "B", help: "The dialogue mentions finding a *desk* for a flight, which is typical for check-in." \}, \{ id: 2, dialogue: ["A: Do you have any liquids in your bag?", "B: No, I don't."], question: "What is happening?", options: ["A security check.", "Boarding the plane.", "Buying a ticket."], answer: "A", help: "Asking about items in a bag is a common *security* procedure." \}, \{ id: 3, dialogue: ["A: Your flight is delayed by one hour.", "B: Oh, no. I'll miss my connection."], question: "What is the problem?", options: ["The flight is cancelled.", "The flight is late.", "The flight is on time."], answer: "B", help: "The word *delayed* indicates a change in the original departure time." \}, \{ id: 4, dialogue: ["A: Can I see your passport and boarding pass, please?", "B: Here you are."], question: "Where is this conversation likely taking place?", options: ["At the hotel.", "At the restaurant.", "At the boarding gate."], answer: "C", help: "Showing a *boarding pass* is the final step before getting on the plane." \}, \{ id: 5, dialogue: ["A: I'd like a window seat, please.", "B: Certainly. You are in 23A."], question: "What did the person request?", options: ["An aisle seat.", "A seat near the window.", "A seat at the front."], answer: "B", help: "A *window seat* offers a view outside the aircraft." \} ]\}, \{ topic: 'Shopping for Clothes', items: [ \{ id: 1, dialogue: ["A: Can I help you?", "B: Yes, I'm looking for a blue t-shirt."], question: "What does the customer want?", options: ["A red dress.", "Blue pants.", "A t-shirt that is blue."], answer: "C", help: "The customer clearly states they are *looking for* a specific item of clothing." \}, \{ id: 2, dialogue: ["A: What size are you?", "B: I'm a medium."], question: "What are they talking about?", options: ["The price.", "The color.", "The size."], answer: "C", help: "Words like 'small', 'medium', and 'large' refer to clothing *size*." \}, \{ id: 3, dialogue: ["A: Does this look good on me?", "B: Yes, it suits you perfectly!"], question: "What is person B's opinion?", options: ["It looks bad.", "It fits well.", "It is too expensive."], answer: "B", help: "The phrase *suits you* is a way to say that something looks good on a person." \}, \{ id: 4, dialogue: ["A: How much is this jacket?", "B: It's $50."], question: "What information is requested?", options: ["The size of the jacket.", "The price of the jacket.", "The color of the jacket."], answer: "B", help: "The question *How much* asks about the cost of an item." \}, \{ id: 5, dialogue: ["A: I'll take it.", "B: Great. Will that be cash or card?"], question: "What is the customer doing?", options: ["Returning an item.", "Trying on clothes.", "Buying an item."], answer: "C", help: "The phrases *I'll take it* and asking for *cash or card* are part of a purchase process." \} ]\}, \{ topic: 'At the Doctor', items: [ \{ id: 1, dialogue: ["A: What seems to be the problem?", "B: I have a terrible headache."], question: "Why is person B at the doctor's?", options: ["They have a broken leg.", "They have a pain in their head.", "They have a stomach-ache."], answer: "B", help: "A *headache* is a common medical complaint that involves pain in the head." \}, \{ id: 2, dialogue: ["A: How long have you been feeling this way?", "B: For about two days."], question: "What does the doctor want to know?", options: ["The person's age.", "The duration of the symptom.", "The person's address."], answer: "B", help: "The question *How long* is used to ask about a period of time." \}, \{ id: 3, dialogue: ["A: I'm going to prescribe some pills.", "B: Thank you, doctor."], question: "What will the doctor give?", options: ["An injection.", "Some advice.", "A prescription for medicine."], answer: "C", help: "To *prescribe* is what a doctor does to recommend a specific medicine." \}, \{ id: 4, dialogue: ["A: You should get some rest.", "B: I will."], question: "What advice did the doctor give?", options: ["To do more exercise.", "To relax and sleep.", "To eat more vegetables."], answer: "B", help: "The phrase *get some rest* is advice related to recovering from an illness." \}, \{ id: 5, dialogue: ["A: Do you have a fever?", "B: Yes, my temperature is high."], question: "What symptom is being discussed?", options: ["A cough.", "A high body temperature.", "A sore throat."], answer: "B", help: "A *fever* is directly related to having a high body temperature." \} ]\}, \{ topic: 'Making Plans', items: [ \{ id: 1, dialogue: ["A: Are you free on Saturday?", "B: Yes, I am. What's up?"], question: "What is person A trying to do?", options: ["Cancel a meeting.", "Ask about the time.", "Arrange an activity."], answer: "C", help: "Asking if someone is *free* is a typical start to organizing a social event." \}, \{ id: 2, dialogue: ["A: Would you like to go to the cinema?", "B: I'd love to!"], question: "How does person B feel about the invitation?", options: ["They don't want to go.", "They are happy to go.", "They are not sure."], answer: "B", help: "The expression *I'd love to!* shows enthusiasm and acceptance." \}, \{ id: 3, dialogue: ["A: What time should we meet?", "B: How about 7 PM?"], question: "What are they deciding?", options: ["The place.", "The date.", "The time."], answer: "C", help: "The conversation is about a specific hour, indicated by *7 PM*." \}, \{ id: 4, dialogue: ["A: Sorry, I can't make it. I'm busy.", "B: Oh, that's a shame. Maybe next time."], question: "What is person A doing?", options: ["Accepting an invitation.", "Suggesting a place.", "Declining an invitation."], answer: "C", help: "Saying *I can't make it* is a way of refusing an invitation politely." \}, \{ id: 5, dialogue: ["A: Where should we go?", "B: Let's try that new Italian restaurant."], question: "What are they discussing?", options: ["The location for their meeting.", "The movie they will watch.", "The people who will come."], answer: "A", help: "The mention of a *restaurant* clearly points to a discussion about location." \} ]\}, \{ topic: 'Asking for Directions', items: [ \{ id: 1, dialogue: ["A: Excuse me, how do I get to the bank?", "B: Go straight on, then turn left."], question: "What does person A need?", options: ["Money.", "Information about a location.", "The time."], answer: "B", help: "The phrase *how do I get to* is a direct question for navigation help." \}, \{ id: 2, dialogue: ["A: Is the museum far from here?", "B: No, it's just a five-minute walk."], question: "What does person B say about the distance?", options: ["It's very far.", "It's close by.", "You need a bus."], answer: "B", help: "A short *walk* implies that the destination is near." \}, \{ id: 3, dialogue: ["A: You can't miss it. It's opposite the post office.", "B: Thank you!"], question: "Where is the place located?", options: ["Next to the post office.", "Across from the post office.", "Behind the post office."], answer: "B", help: "The word *opposite* means facing something from the other side." \}, \{ id: 4, dialogue: ["A: Go past the supermarket and it's on your right.", "B: Got it, thanks."], question: "What should person B do?", options: ["Stop at the supermarket.", "Continue walking after the supermarket.", "Turn before the supermarket."], answer: "B", help: "To *go past* something means to continue on your path beyond that landmark." \}, \{ id: 5, dialogue: ["A: Am I on the right road for the station?", "B: Yes, just keep going."], question: "What does person B confirm?", options: ["The person is lost.", "The person is going the wrong way.", "The person is going in the correct direction."], answer: "C", help: "The instruction *keep going* confirms the current path is correct." \} ]\}, \{ topic: 'At a Restaurant', items: [ \{ id: 1, dialogue: ["A: A table for two, please.", "B: Right this way."], question: "What does the customer want?", options: ["To pay the bill.", "To order food.", "To be seated."], answer: "C", help: "Requesting a *table* is the first step when arriving at a restaurant." \}, \{ id: 2, dialogue: ["A: Are you ready to order?", "B: Yes, I'll have the steak, please."], question: "What is person B doing?", options: ["Asking for the menu.", "Choosing their meal.", "Leaving the restaurant."], answer: "B", help: "Stating a specific food item like *steak* is part of ordering a meal." \}, \{ id: 3, dialogue: ["A: How was everything?", "B: It was delicious, thank you."], question: "What is person A asking about?", options: ["The customer's health.", "The quality of the food.", "The price of the meal."], answer: "B", help: "The word *delicious* is a direct comment on the taste of the food." \}, \{ id: 4, dialogue: ["A: Could we have the bill, please?", "B: Of course, I'll bring it right away."], question: "What do the customers want to do?", options: ["Order dessert.", "Pay for their food.", "Make a reservation."], answer: "B", help: "Asking for the *bill* means you are ready to pay and leave." \}, \{ id: 5, dialogue: ["A: Does this dish contain nuts? I'm allergic.", "B: Let me check with the kitchen for you."], question: "Why is the customer asking this question?", options: ["They really like nuts.", "They have a food allergy.", "They want extra nuts."], answer: "B", help: "Mentioning an *allergy* indicates a serious health concern about an ingredient." \} ]\} ] \};\
const exercisesDataPart3 = [ \{ topic: 'Completing Conversations 1', items: [ \{ id: 1, dialogue: "A: I'm so tired. <br> B: _________", options: ["Me too.", "I don't like it.", "Good morning."], answer: "A", help: "Person B is agreeing with Person A. Which option shows agreement?" \}, \{ id: 2, dialogue: "A: What's the weather like? <br> B: _________", options: ["It's half past three.", "It's sunny.", "I'm fine, thanks."], answer: "B", help: "Person A is asking about the weather. Which response describes the weather?" \}, \{ id: 3, dialogue: "A: Can you help me with this box? <br> B: _________", options: ["You're welcome.", "I'm sorry.", "Of course."], answer: "C", help: "Person B is agreeing to help. Which phrase is a positive way to say yes?" \}, \{ id: 4, dialogue: "A: Thank you so much! <br> B: _________", options: ["Don't mention it.", "I'm 18 years old.", "I don't know."], answer: "A", help: "What is a polite way to respond when someone thanks you?" \}, \{ id: 5, dialogue: "A: Excuse me, what time is it? <br> B: _________", options: ["It's on the left.", "I like football.", "It's ten o'clock."], answer: "C", help: "The question asks for the current time. Which option provides a time?" \} ]\}, \{ topic: 'Completing Conversations 2', items: [ \{ id: 1, dialogue: "A: I'm sorry, I'm late. <br> B: _________", options: ["That's all right.", "Thank you.", "I hope so."], answer: "A", help: "Which phrase is a common way to accept an apology?" \}, \{ id: 2, dialogue: "A: How do you do? <br> B: _________", options: ["I'm a student.", "How do you do?", "I'm doing my homework."], answer: "B", help: "This is a very formal greeting. What is the traditional response?" \}, \{ id: 3, dialogue: "A: Have a nice weekend! <br> B: _________", options: ["I can't.", "You too.", "It's Monday."], answer: "B", help: "What is the standard reply when someone wishes you well for the future?" \}, \{ id: 4, dialogue: "A: What does your father do? <br> B: _________", options: ["He's very well.", "He's a doctor.", "He's at home."], answer: "B", help: "This question asks about someone's profession. Which option describes a job?" \}, \{ id: 5, dialogue: "A: I passed my exam! <br> B: _________", options: ["Here you are.", "What a pity.", "Congratulations!"], answer: "C", help: "What do you say when someone shares exciting, positive news?" \} ]\}, \{ topic: 'Completing Conversations 3', items: [ \{ id: 1, dialogue: "A: Where did you go on holiday? <br> B: _________", options: ["I went by plane.", "I'm going to the beach.", "We went to Cartagena."], answer: "C", help: "Think about what kind of information the word 'Where' asks for. Is it a time, a person, or a place?" \}, \{ id: 2, dialogue: "A: Would you like a cup of coffee? <br> B: _________", options: ["Yes, please.", "I like tea.", "It's expensive."], answer: "A", help: "Which phrase is a polite and direct way to accept an offer?" \}, \{ id: 3, dialogue: "A: How often do you exercise? <br> B: _________", options: ["In the park.", "I'm very fit.", "Three times a week."], answer: "C", help: "The question 'How often' asks about frequency. Which answer describes how frequently something happens?" \}, \{ id: 4, dialogue: "A: Can I borrow your pen? <br> B: _________", options: ["It's blue.", "Sure, here you are.", "I bought it yesterday."], answer: "B", help: "Which phrase is commonly used when you give an object to someone who asked for it?" \}, \{ id: 5, dialogue: "A: Whose bag is this? <br> B: _________", options: ["It's mine.", "It's a new bag.", "It's on the table."], answer: "A", help: "The question 'Whose' asks about possession. Which answer indicates who the owner is?" \} ]\} ];\
const exercisesDataPart4 = [ \{ topic: "The History of Chocolate", text: "<p>Chocolate has a rich history that dates back to ancient Mesoamerican civilizations, such as the Olmec, Maya, and Aztec. They consumed chocolate as a bitter, foamy drink, often mixed with spices or chili peppers. For them, <vocab-word data-def='Seeds from a tropical tree from which chocolate is made.'>cacao beans</vocab-word> were more valuable than gold and were even used as currency.</p><p>When the Spanish conquistadors arrived in the 16th century, they brought cacao beans back to Europe. However, its bitter taste did not immediately appeal to the Europeans. They started adding sugar and honey to the drink, which transformed it into a luxury treat for the rich. For a long time, chocolate remained a secret of the Spanish court.</p><p>The Industrial Revolution in the 19th century made chocolate <vocab-word data-def='Easy to find or get.'>accessible</vocab-word> to everyone. In 1828, a Dutch chemist, Coenraad van Houten, invented the cocoa press, which could separate cocoa butter from the cacao beans. This led to the creation of modern solid chocolate. Later, in 1875, Daniel Peter and Henri Nestl\'e9 in Switzerland added milk to chocolate, creating the milk chocolate we love today.</p>", items: [ \{ id: 1, question: "What was the original use of cacao beans?", options: ["As a sweet candy", "As a form of money", "As a decoration"], answer: "B", hintFragment: "For them, cacao beans were...", help: "This sentence explains how the beans were valued and used. What does it say?" \}, \{ id: 2, question: "How did Europeans change the original chocolate drink?", options: ["They made it bitter", "They added salt", "They added sugar"], answer: "C", hintFragment: "They started adding...", help: "This sentence explains what Europeans added to make the drink more pleasant for them." \}, \{ id: 3, question: "The word 'accessible' in the third paragraph is closest in meaning to...", options: ["Available", "Expensive", "Hidden"], answer: "A", hintFragment: "The Industrial Revolution...", help: "Consider what the Industrial Revolution did for products. Did it make them easier or harder for people to get?" \}, \{ id: 4, question: "What was the importance of the cocoa press invention?", options: ["It made chocolate bitter again", "It allowed for the creation of solid chocolate", "It mixed chocolate with chili"], answer: "B", hintFragment: "This led to the creation of...", help: "The text describes what the cocoa press did and what that invention led to." \}, \{ id: 5, question: "Who were the inventors of milk chocolate?", options: ["The Aztecs", "The Spanish conquistadors", "Peter and Nestl\'e9"], answer: "C", hintFragment: "Daniel Peter and Henri Nestl\'e9...", help: "The end of the text mentions the specific people who created milk chocolate in Switzerland." \} ]\}, \{ topic: "The Great Barrier Reef", text: "<p>The Great Barrier Reef, located off the coast of Queensland, Australia, is the world's largest coral reef system. It is composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. This <vocab-word data-def='Something beautiful and amazing in nature.'>natural wonder</vocab-word> is so large that it can be seen from outer space and is the world's biggest single structure made by living organisms.</p><p>The reef is a home to a stunning <vocab-word data-def='A great variety of things.'>diversity</vocab-word> of life. It supports a wide range of species, including more than 1,500 species of fish, 411 types of hard coral, and one-third of the world's soft corals. It is also a very important breeding ground for species such as humpback whales, sea turtles, and seabirds.</p><p>Unfortunately, the Great Barrier Reef is under threat from a combination of factors. <vocab-word data-def='Changes in the Earth\'92s weather patterns.'>Climate change</vocab-word> is the biggest threat, leading to rising sea temperatures. This causes coral bleaching, a phenomenon where corals expel the algae living in their tissues, causing them to turn completely white and often die. Pollution from farms and coastal cities also damages the reef, as does overfishing. Efforts are being underway to protect it, but it remains a significant challenge.</p>", items: [ \{ id: 1, question: "What is the most impressive feature of the Great Barrier Reef's size?", options: ["It is the longest river.", "It can be seen from space.", "It is the tallest mountain."], answer: "B", hintFragment: "This natural wonder is so large...", help: "The first paragraph mentions a unique fact about its visibility." \}, \{ id: 2, question: "The word 'diversity' in the second paragraph refers to...", options: ["A large number of similar things", "A lack of variety", "A wide variety of different things"], answer: "C", hintFragment: "It supports a wide range of species...", help: "The text lists many different kinds of animals and corals. What does that suggest about the life there?" \}, \{ id: 3, question: "Which of the following is NOT mentioned as a threat to the reef?", options: ["Pollution", "Earthquakes", "Climate change"], answer: "B", hintFragment: "Climate change is the biggest threat...", help: "Read this list of threats carefully. Which of the options is missing from the text?" \}, \{ id: 4, question: "What is coral bleaching?", options: ["When corals change their color for fun", "When corals die due to cold water", "When corals lose their algae due to warm water"], answer: "C", hintFragment: "...a phenomenon where corals expel...", help: "This sentence explains what happens to the corals and why they turn white." \}, \{ id: 5, question: "What is the main idea of the last paragraph?", options: ["The reef is a popular tourist destination.", "The reef is facing serious dangers.", "The reef is growing larger every year."], answer: "B", hintFragment: "Unfortunately, the Great Barrier Reef is under threat...", help: "Consider the overall tone of the final paragraph, starting with the first word. Is it positive, negative, or neutral?" \} ]\}, \{ topic: "The Life of a Honeybee", text: "<p>Honeybees are fascinating insects that live in large, organized colonies. Each colony has a single queen, many male drones, and thousands of female worker bees. The queen bee's main job is to lay eggs, sometimes up to 2,000 per day. The drones' only purpose is to mate with the queen. The worker bees, however, have many jobs.</p><p>When a worker bee is young, she works inside the <vocab-word data-def='The place where bees live.'>hive</vocab-word>. Her jobs include cleaning the hive, feeding the queen and drones, and building the honeycomb with wax. As she gets older, she moves to more dangerous work outside the hive. These older bees are the ones you see flying from flower to flower.</p><p>Their most important job is <vocab-word data-def='Searching for food.'>foraging</vocab-word> for nectar and pollen. Nectar is a sweet liquid from flowers, which they use to make honey. Pollen is a powder that they collect and use as a protein source. While collecting these, bees perform another <vocab-word data-def='Extremely important or necessary.'>vital</vocab-word> task: pollination. As they move between flowers, they transfer pollen, which helps plants produce fruit and seeds. This process is essential for many of the fruits and vegetables we eat.</p>", items: [ \{ id: 1, question: "What is the main role of the queen bee?", options: ["To build the honeycomb", "To collect nectar", "To lay eggs"], answer: "C", hintFragment: "The queen bee's main job is...", help: "The first paragraph describes the job of each type of bee. Find what it says about the queen." \}, \{ id: 2, question: "A young worker bee would most likely be found...", options: ["Flying far from the hive", "Inside the hive", "Mating with the queen"], answer: "B", hintFragment: "When a worker bee is young, she works...", help: "The second paragraph explains the difference between the jobs of young and old worker bees." \}, \{ id: 3, question: "What do bees use to make honey?", options: ["Pollen", "Wax", "Nectar"], answer: "C", hintFragment: "Nectar is a sweet liquid...", help: "The third paragraph explains what honey is made from." \}, \{ id: 4, question: "The word 'vital' in the third paragraph means...", options: ["Unimportant", "Extremely important", "Optional"], answer: "B", hintFragment: "...bees perform another vital task...", help: "Think about the role of pollination for our food, which the text calls 'essential'. Is it a minor or major role?" \}, \{ id: 5, question: "What is pollination?", options: ["The process of making honey", "The transfer of pollen between flowers", "The process of cleaning the hive"], answer: "B", hintFragment: "As they move between flowers, they transfer pollen...", help: "The last paragraph gives a clear definition of what happens during pollination." \} ]\} ];\
const exercisesDataPart5 = [ \{ topic: 'The History of the Internet', text: "The Internet has changed the world in ways that were once <vocab-word data-def='Difficult to imagine because it is so strange or so good.'>unimaginable</vocab-word>. Its origins can be __(0)__ back to the 1960s, during the Cold War. The U.S. military wanted a communication system that could __(1)__ a nuclear attack. This led to the creation of ARPANET, a network that connected computers at different universities. For many years, it was __(2)__ used by scientists and researchers. The invention of the World Wide Web in 1990 by Tim Berners-Lee made the Internet much easier to use. It allowed people to __(3)__ web pages with text, images, and links. Since then, the Internet has grown at an incredible __(4)__, connecting billions of people worldwide.", items: [ \{ id: 0, options: ["traced", "drew", "followed", "looked"], answer: "traced", help: "The phrase 'traced back to' is a common idiom meaning to find the origin of something." \}, \{ id: 1, options: ["survive", "stop", "begin", "win"], answer: "survive", help: "The system needed to continue existing even after an attack. Which verb means this?" \}, \{ id: 2, options: ["only", "ever", "still", "yet"], answer: "only", help: "The sentence implies a limited group of users (scientists). Which word best expresses this limitation?", optionHints: \{"ever": "Used in questions or negative sentences.", "still": "Indicates something continues to the present."\} \}, \{ id: 3, options: ["see", "write", "send", "call"], answer: "see", help: "What is the primary action you do with web pages? You look at them." \}, \{ id: 4, options: ["speed", "size", "cost", "color"], answer: "speed", help: "The context describes fast growth. Which word relates to how fast something happens?" \} ] \}, \{ topic: 'The Importance of Sleep', text: "Getting enough quality sleep is __(0)__ for our physical and mental health. While we sleep, our bodies work to repair muscles, consolidate memories, and regulate hormones. Most adults need around 7-9 hours of sleep per night, __(1)__ teenagers and children need even more. A lack of sleep can have serious consequences. It can weaken our immune system, making us more __(2)__ to illness. It can also affect our mood, concentration, and ability to learn new things. To improve your sleep, it's a good idea to __(3)__ a regular sleep schedule, even on weekends. You should also create a restful environment that is dark, quiet, and cool. Avoiding <vocab-word data-def='Electronic devices like phones, tablets, or TVs.'>screens</vocab-word> like phones or TVs __(4)__ bedtime can also make a big difference.", items: [ \{ id: 0, options: ["optional", "harmful", "vital", "unusual"], answer: "vital", help: "The sentence describes something essential for health. Which word means 'very important' or 'necessary'?" \}, \{ id: 1, options: ["because", "although", "so", "if"], answer: "although", help: "This word introduces a contrast. Adults need a lot of sleep, *and yet* teenagers need even more.", optionHints: \{"because": "Explains a reason.", "so": "Shows a result."\} \}, \{ id: 2, options: ["open", "similar", "related", "susceptible"], answer: "susceptible", help: "When your immune system is weak, you are more easily affected by illness. Which word means 'likely to be influenced or harmed'?" \}, \{ id: 3, options: ["break", "forget", "maintain", "change"], answer: "maintain", help: "The sentence recommends keeping a consistent schedule. Which verb means to keep something in its existing state?" \}, \{ id: 4, options: ["after", "before", "during", "without"], answer: "before", help: "This is advice about what to do in the time leading up to sleep. Which word means 'earlier than'?" \} ] \}, \{ topic: 'The Rise of Social Media', text: "Social media has completely transformed the way we communicate and share information. Platforms like Facebook, Twitter, and Instagram allow users to __(0)__ with friends, family, and even strangers across the globe in an instant. This started in the early 2000s with sites like Friendster and MySpace, but it was Facebook's launch in 2004 that truly __(1)__ the social media revolution. These platforms allow us to share updates, photos, and videos, creating a digital version of our lives. However, this constant connection also has a downside. Many experts are __(2)__ about issues like privacy, mental health, and the spread of <vocab-word data-def='False or inaccurate information, especially that which is deliberately intended to deceive.'>misinformation</vocab-word>. It is important to use social media __(3)__ and be aware of the time we spend on it. The future of social media is uncertain, but it will likely become even more __(4)__ in our daily lives.", items: [ \{ id: 0, options: ["connect", "fight", "work", "ignore"], answer: "connect", help: "What is the main purpose of social media? To form a link with others." \}, \{ id: 1, options: ["stopped", "hid", "sparked", "cooled"], answer: "sparked", help: "Which word means 'to start' or 'to cause something to begin', like starting a fire?" \}, \{ id: 2, options: ["happy", "excited", "uninterested", "concerned"], answer: "concerned", help: "Experts are worried about the negative aspects. Which word means 'worried' or 'anxious'?" \}, \{ id: 3, options: ["carelessly", "quickly", "mindfully", "loudly"], answer: "mindfully", help: "The sentence advises using social media with awareness and thought. Which word means 'with careful attention'?" \}, \{ id: 4, options: ["separated", "integrated", "removed", "forgotten"], answer: "integrated", help: "The text suggests social media will become an even bigger part of our lives. Which word means 'to combine or become a part of something larger'?" \} ] \} ];\
const exercisesDataPart6 = [ \{ topic: "The Man Who Invented the Web", text: "<p>Many people confuse the Internet and the World Wide Web, but they are not the same thing. The Internet is the huge network of computers, while the World Wide Web (or 'the Web') is the collection of pages you see when you are online. The Web was invented by a British computer scientist named Tim Berners-Lee in 1989.</p><p>Berners-Lee was working at CERN, the European Organization for Nuclear Research, in Switzerland. He noticed that scientists were having trouble sharing information. They used different types of computers and programs, which could not easily communicate with each other. He imagined a system that would allow them to link their documents together, creating a 'web' of information that anyone could access. He created the first web browser and web server and designed the three main technologies that remain the foundation of today's Web: HTML (HyperText Markup Language), URI (Uniform Resource Identifier, also known as a URL), and HTTP (Hypertext Transfer Protocol).</p><p>The first website went live in 1991. What is most remarkable about his invention is that Berners-Lee gave it to the world for free. He decided not to patent his invention, ensuring that it would be an open and accessible standard for everyone. He believed this was the only way it could grow and be used globally. His decision has had a massive impact on the world, shaping how we learn, communicate, shop, and entertain ourselves. He is now the director of the World Wide Web Consortium (W3C), which continues to develop standards for the Web.</p>", items: [ \{ id: 1, question: "What is the main topic of the text?", options: ["The history of CERN", "The life of Tim Berners-Lee and his invention", "The difference between HTML and HTTP"], answer: "B", hintFragment: "The Web was invented by...", help: "Consider the person who is mentioned most and what the text says about his work." \}, \{ id: 2, question: "What problem did Tim Berners-Lee want to solve at CERN?", options: ["The computers were too slow", "Scientists could not easily share information", "There was no Internet in Switzerland"], answer: "B", hintFragment: "He noticed that scientists were having trouble...", help: "The second paragraph explains the initial motivation for his project." \}, \{ id: 3, question: "The word 'foundation' in the second paragraph is closest in meaning to...", options: ["Top", "Rule", "Base"], answer: "C", hintFragment: "...remain the foundation of today's Web...", help: "Think of a house. What is the most important part at the bottom that supports everything else?" \}, \{ id: 4, question: "What does the author find 'remarkable' about the invention?", options: ["That it was invented in Switzerland", "That it was used by scientists", "That it was given away for free"], answer: "C", hintFragment: "What is most remarkable about...", help: "The third paragraph highlights a specific decision Berners-Lee made about his invention." \}, \{ id: 5, question: "According to the text, why did Berners-Lee not patent his invention?", options: ["He did not think it was valuable", "He wanted it to be used by everyone", "He forgot to do it"], answer: "B", hintFragment: "...ensuring that it would be an open...", help: "The text explains his belief about how the Web could grow." \}, \{ id: 6, question: "What does Tim Berners-Lee do now?", options: ["He works for the U.S. military", "He leads the organization that develops Web standards", "He has retired from computer science"], answer: "B", hintFragment: "He is now the director of...", help: "The last sentence of the text describes his current role." \}, \{ id: 7, question: "The text states that the Internet and the Web are...", options: ["The same thing", "Two different things", "Invented by the same person"], answer: "B", hintFragment: "Many people confuse the Internet and the World Wide Web...", help: "Read the first sentence of the text carefully." \}, \{ id: 8, question: "The first web browser was created by...", options: ["CERN", "The U.S. military", "Tim Berners-Lee"], answer: "C", hintFragment: "He created the first web browser...", help: "The second paragraph attributes this creation to a specific person." \}, \{ id: 9, question: "The word 'shaping' in the last paragraph means...", options: ["Breaking", "Influencing", "Forgetting"], answer: "B", hintFragment: "...shaping how we learn...", help: "How has the Web affected our daily activities? It has changed or ___ them." \}, \{ id: 10, question: "When did the first website become active?", options: ["1989", "1991", "1875"], answer: "B", hintFragment: "The first website went live...", help: "Look for the year mentioned at the beginning of the third paragraph." \} ] \}, \{ topic: "The Importance of Bees", text: "<p>Bees are small flying insects, but their importance to our planet is enormous. They are known for producing honey and beeswax, but their most critical role is that of pollinators. Pollination is the process of moving pollen from one part of a flower to another, or from one flower to another of the same species, which is needed for plants to produce seeds and fruits.</p><p>Globally, about one-third of the food that we consume each day relies on pollination, mainly by bees. Fruits like apples, berries, and cucumbers, as well as vegetables and nuts, all depend on these busy insects. Without bees, our diets would be much less varied and nutritious, and many of the foods we love would become rare and expensive.</p><p>However, the global bee population is in decline. This is due to a combination of factors, including habitat loss, the use of pesticides in farming, and climate change. When bees' homes, like wildflower meadows, are destroyed for buildings or farms, they have fewer places to live and find food. Certain pesticides can also be very harmful, weakening their immune systems or killing them directly. It is vital that we take action to protect these essential creatures, for example, by planting more bee-friendly flowers and reducing the use of harmful chemicals.</p>", items: [ \{ id: 1, question: "What is the most important job of bees, according to the text?", options: ["Producing beeswax", "Pollination", "Living in colonies"], answer: "B", hintFragment: "...their most critical role is...", help: "Look for the word 'critical' or 'most important' in the first paragraph." \}, \{ id: 2, question: "What portion of our food depends on pollination?", options: ["All of it", "About one-third", "A very small part"], answer: "B", hintFragment: "Globally, about one-third...", help: "The second paragraph gives a specific fraction." \}, \{ id: 3, question: "The word 'varied' in the second paragraph means...", options: ["Boring and repetitive", "Full of different types", "Not very healthy"], answer: "B", hintFragment: "...our diets would be much less varied...", help: "If many foods disappeared, would our diet have more or fewer options?" \}, \{ id: 4, question: "Which of the following is a cause of the decline in the bee population?", options: ["Habitat loss", "Too much honey production", "An increase in flowers"], answer: "A", hintFragment: "...due to a combination of factors, including...", help: "The third paragraph lists several reasons for the bees' decline." \}, \{ id: 5, question: "What is an example of a bee-friendly action?", options: ["Using more pesticides", "Building more cities", "Planting more flowers"], answer: "C", hintFragment: "...by planting more bee-friendly flowers...", help: "The last sentence suggests a way to help protect bees." \}, \{ id: 6, question: "The text suggests that without bees, some foods would become...", options: ["Cheaper and more common", "More nutritious", "Rare and expensive"], answer: "C", hintFragment: "...many of the foods we love would become...", help: "The second paragraph describes the economic consequence of losing bees." \}, \{ id: 7, question: "What is 'habitat loss'?", options: ["When bees lose their honey", "When bees cannot find their queen", "When the places where bees live are destroyed"], answer: "C", hintFragment: "When bees' homes, like wildflower meadows, are destroyed...", help: "Think about what the word 'habitat' means. The text gives an example." \}, \{ id: 8, question: "The word 'decline' in the third paragraph means...", options: ["Increase", "Stability", "Decrease"], answer: "C", hintFragment: "...the global bee population is in decline.", help: "If the bee population is facing threats, is it likely getting bigger or smaller?" \}, \{ id: 9, question: "What is pollination necessary for?", options: ["For bees to make wax", "For plants to produce seeds and fruits", "For bees to fly"], answer: "B", hintFragment: "...which is needed for plants to produce...", help: "The first paragraph explains the result of the pollination process." \}, \{ id: 10, question: "The overall tone of the text is...", options: ["Humorous", "Concerned", "Angry"], answer: "B", hintFragment: "Unfortunately... It is vital that we take action...", help: "Consider the words the author uses, like 'unfortunately' and 'vital'. What emotion do they convey?" \} ] \}, \{ topic: "The History of Pizza", text: "<p>Pizza, as we know it today, is a dish of Italian origin, but its history is long and complex. The ancient Greeks had a flatbread called 'plakous' which was topped with herbs, onion, and garlic. It wasn't until the 18th century in Naples, Italy, that pizza began to resemble the dish we love today. At that time, Naples was a thriving waterfront city, and its working poor needed inexpensive food that could be eaten quickly.</p><p>The first pizzas were simple flatbreads with toppings like garlic, salt, and lard. Later, tomatoes, which were brought to Italy from the Americas in the 16th century, were added. For a long time, many Europeans believed tomatoes were poisonous, so they were not widely eaten by the upper classes. Pizza remained a local dish for the poor people of Naples.</p><p>Everything changed in 1889 when King Umberto I and Queen Margherita visited Naples. Legend has it that they grew tired of their usual gourmet food and asked to try some local specialties. A pizzamaker named Raffaele Esposito created a pizza for the queen with toppings of tomato, mozzarella cheese, and fresh basil, representing the colors of the Italian flag. Queen Margherita loved it, and this 'Pizza Margherita' became hugely popular, elevating the status of pizza. Italian immigrants later brought pizza to America, where it evolved into the globally beloved dish it is today.</p>", items: [ \{ id: 1, question: "Where did the modern pizza originate?", options: ["Ancient Greece", "America", "Naples, Italy"], answer: "C", hintFragment: "...it wasn't until the 18th century in Naples...", help: "The first paragraph mentions the specific city and country." \}, \{ id: 2, question: "Why was pizza initially popular among the working poor?", options: ["It was expensive and luxurious.", "It was cheap and could be eaten fast.", "It was only sold in palaces."], answer: "B", hintFragment: "...its working poor needed inexpensive food...", help: "The end of the first paragraph explains the needs of the people who first ate pizza." \}, \{ id: 3, question: "Why were tomatoes not eaten by the rich for a long time?", options: ["They were too expensive.", "They were believed to be poisonous.", "They only grew in Naples."], answer: "B", hintFragment: "For a long time, many Europeans believed...", help: "The second paragraph gives a specific reason for the unpopularity of tomatoes." \}, \{ id: 4, question: "The word 'thriving' in the first paragraph means...", options: ["Poor and struggling", "Crowded and dirty", "Successful and growing"], answer: "C", hintFragment: "...Naples was a thriving waterfront city...", help: "The text describes Naples as a busy city. Does 'thriving' sound positive or negative?" \}, \{ id: 5, question: "Who was Raffaele Esposito?", options: ["The King of Italy", "A pizza maker", "A food critic"], answer: "B", hintFragment: "A pizzamaker named Raffaele Esposito...", help: "The third paragraph identifies his profession." \}, \{ id: 6, question: "What did the toppings of the Pizza Margherita represent?", options: ["The city of Naples", "The ingredients of the season", "The colors of the Italian flag"], answer: "C", hintFragment: "...representing the colors of the Italian flag.", help: "The text directly states what the red, white, and green toppings symbolized." \}, \{ id: 7, question: "What effect did Queen Margherita's approval have on pizza?", options: ["It made pizza less popular.", "It elevated the status of pizza.", "It caused pizza to be banned."], answer: "B", hintFragment: "Queen Margherita loved it... elevating the status of pizza.", help: "Consider what happens when a famous person likes a product." \}, \{ id: 8, question: "The word 'gourmet' in the third paragraph describes food that is...", options: ["Simple and plain", "High-quality and sophisticated", "Unhealthy and fast"], answer: "B", hintFragment: "...they grew tired of their usual gourmet food...", help: "The text contrasts 'gourmet food' with 'local specialties'. This suggests gourmet food is the fancy food kings and queens usually eat." \}, \{ id: 9, question: "How did pizza become popular in America?", options: ["Through a royal visit", "Through a TV show", "Through Italian immigrants"], answer: "C", hintFragment: "Italian immigrants later brought pizza...", help: "The last sentence explains who introduced the dish to the United States." \}, \{ id: 10, question: "Before the 18th century, a similar dish existed in...", options: ["Rome", "Greece", "Spain"], answer: "B", hintFragment: "The ancient Greeks had a flatbread...", help: "The very first paragraph mentions an ancient civilization and their version of flatbread." \} ] \} ];\
const exercisesDataPart7 = [ \{ topic: "The History of Coffee", text: "Coffee is one of the world's most popular drinks, with billions of cups consumed every day. Its story begins in the ancient coffee forests on the Ethiopian plateau. There, legend says the goat herder Kaldi first discovered the __(0)__ of these beloved beans. He noticed that after eating berries from a certain tree, his goats became so energetic that they did not want to sleep at night. Kaldi reported his findings to the abbot of the local monastery, who made a __(1)__ with the berries and found that it kept him alert through the long hours of evening prayer. The abbot shared his discovery with the other monks, and knowledge of the energizing berries began to __(2)__ . Word moved east and coffee reached the Arabian Peninsula. It was not until the 17th century that coffee made its way to Europe, quickly becoming popular across the __(3)__ . Coffee houses became centers of social activity and communication. Despite some controversy, the drink's popularity continued to grow, eventually becoming the global __(4)__ it is today.", items: [ \{ id: 0, options: ["potential", "color", "smell", "size"], answer: "potential", help: "Kaldi discovered what the beans were capable of. Which word means 'latent qualities or abilities'?" \}, \{ id: 1, options: ["drink", "cake", "salad", "food"], answer: "drink", help: "The abbot used the berries to make something to consume. Which is the most direct word for a prepared liquid?" \}, \{ id: 2, options: ["spread", "stop", "hide", "return"], answer: "spread", help: "The information about the berries started to travel to more people. Which verb means to extend over a larger area?" \}, \{ id: 3, options: ["continent", "house", "city", "ocean"], answer: "continent", help: "Europe is a large landmass, not just one country. Which word fits this geographical scale?" \}, \{ id: 4, options: ["commodity", "problem", "secret", "animal"], answer: "commodity", help: "Coffee is now a major product that is bought and sold globally. Which word means a raw material or primary agricultural product?" \} ] \}, \{ topic: "The History of Glass", text: "The exact origin of glass is unknown, but it is believed that it was first created in Mesopotamia around 3500 BC. The first glass objects were mostly beads, not the transparent material we know __(0)__. For many centuries, glass was a luxury item, difficult to make and very expensive. The Romans were excellent glassmakers and were the first to use glass for windows, __(1)__ it was not very clear. They also developed the technique of glassblowing around 50 BC, which made it possible to create a wider __(2)__ of shapes and vessels more quickly and cheaply. After the fall of the Roman Empire, glassmaking skills were preserved in the Middle East. It was in Venice during the 13th century that glassmaking was revived in Europe. Venetian glassmakers were famous for their skill and creativity, and their secrets were __(3)__ guarded. Today, glass is used in countless applications, from windows and bottles to fiber optic cables that power the internet, something the ancient Romans could never have __(4)__.", items: [ \{ id: 0, options: ["tomorrow", "today", "yesterday", "later"], answer: "today", help: "The text is contrasting the first glass objects with the glass we are familiar with in the present." \}, \{ id: 1, options: ["because", "so", "although", "if"], answer: "although", help: "This word introduces a contrast: they used it for windows, but it had a negative quality (not clear)." \}, \{ id: 2, options: ["variety", "single", "piece", "group"], answer: "variety", help: "Glassblowing allowed them to make many different kinds of shapes. Which word means 'many different types'?" \}, \{ id: 3, options: ["loosely", "openly", "closely", "quickly"], answer: "closely", help: "The sentence implies that the secrets were protected carefully. Which adverb means 'carefully and with great attention'?" \}, \{ id: 4, options: ["imagined", "sold", "broken", "forgotten"], answer: "imagined", help: "The idea of the internet would have been impossible for the Romans to even think of. Which verb means to form a mental image or concept?" \} ] \}, \{ topic: "The Story of Chocolate", text: "Chocolate's history begins in ancient Mesoamerica, present-day Mexico. Here, ancient civilizations like the Mayans and Aztecs __(0)__ the cacao bean, which is the source of chocolate. They considered cacao a divine gift and used the beans to create a bitter, frothy drink, often mixed with spices. This was very different from the sweet, solid chocolate bars we enjoy now. Cacao beans were so __(1)__ that they were even used as a form of currency. It wasn't until the 16th century that Spanish explorers brought the beans back to Europe. At first, it remained a drink for the rich and noble. The Spanish added sugar and honey to counteract the natural bitterness, which made it much more __(2)__ . The invention of the cocoa press in 1828 was a major __(3)__ , as it allowed for the creation of solid chocolate. This made chocolate __(4)__ to a much wider audience, eventually leading to the global sensation it is today.", items: [ \{ id: 0, options: ["discovered", "ate", "cultivated", "sold"], answer: "cultivated", help: "They grew the plant for its beans. Which word means 'to grow or raise a plant'?" \}, \{ id: 1, options: ["common", "tasteless", "valuable", "heavy"], answer: "valuable", help: "They were used as money. This means they were worth a lot. Which word reflects this?" \}, \{ id: 2, options: ["bitter", "palatable", "expensive", "sour"], answer: "palatable", help: "Adding sugar made the drink more pleasant to taste. Which word means 'pleasant to taste'?" \}, \{ id: 3, options: ["problem", "secret", "turning point", "idea"], answer: "turning point", help: "This invention was a key moment that changed everything for chocolate. Which phrase means a time of decisive change?" \}, \{ id: 4, options: ["hidden", "forbidden", "accessible", "known"], answer: "accessible", help: "Solid chocolate was easier to make and sell, so more people could get it. Which word means 'able to be reached or obtained'?" \} ] \} ];\
const grammarData = [ \{ topic: "Present Simple", explanation: `<p>Usamos el <strong>Presente Simple</strong> para hablar de h\'e1bitos, rutinas y hechos generales.</p><ul class="list-disc list-inside my-2"><li>I <strong class="text-green-600">work</strong> every day. (H\'e1bito)</li><li>The sun <strong class="text-green-600">rises</strong> in the east. (Hecho general)</li></ul><p>Recuerda a\'f1adir una <strong>-s</strong> al final del verbo para la tercera persona del singular (he, she, it).</p><p>Ejemplo: She <strong class="text-green-600">works</strong> in an office.</p>`, exercises: [ \{ question: "He ___ (work) in a hospital.", answer: "works" \}, \{ question: "They ___ (play) soccer on weekends.", answer: "play" \}, \{ question: "A cat ___ (like) milk.", answer: "likes" \} ] \}, \{ topic: "Present Continuous", explanation: `<p>Usamos el <strong>Presente Continuo</strong> (am/is/are + verbo-ing) para hablar de acciones que est\'e1n sucediendo en este momento.</p><ul class="list-disc list-inside my-2"><li>I <strong class="text-blue-600">am studying</strong> right now.</li><li>Look! The dog <strong class="text-blue-600">is running</strong> in the park.</li></ul><p>Tambi\'e9n se puede usar para planes futuros definidos.</p><p>Ejemplo: We <strong class="text-blue-600">are meeting</strong> friends tonight.</p>`, exercises: [ \{ question: "She ___ (read) a book at the moment.", answer: "is reading" \}, \{ question: "We ___ (watch) a movie now.", answer: "are watching" \}, \{ question: "Please be quiet, the baby ___ (sleep).", answer: "is sleeping" \} ] \}, \{ topic: "WH-Words", explanation: `<p>Las <strong>WH-Words</strong> se usan para hacer preguntas espec\'edficas sobre personas, lugares, cosas, tiempo, razones y maneras.</p> <ul class="list-disc list-inside my-2 space-y-2"> <li><strong class="text-red-600">Who:</strong> pregunta por una persona. (<em>Who is that?</em>)</li> <li><strong class="text-red-600">What:</strong> pregunta por una cosa o acci\'f3n. (<em>What is this?</em>)</li> <li><strong class="text-red-600">Where:</strong> pregunta por un lugar. (<em>Where do you live?</em>)</li> <li><strong class="text-red-600">When:</strong> pregunta por el tiempo. (<em>When is the party?</em>)</li> <li><strong class="text-red-600">Why:</strong> pregunta por una raz\'f3n. (<em>Why are you late?</em>)</li> <li><strong class="text-red-600">How:</strong> pregunta por la manera o condici\'f3n. (<em>How are you?</em>)</li> </ul>`, exercises: [ \{ question: "___ is your favorite color?", answer: "What" \}, \{ question: "___ do you go to school?", answer: "Where" \}, \{ question: "___ is your birthday?", answer: "When" \} ] \}, \{ topic: "Connectors (Conectores)", explanation: `<p>Los <strong>conectores</strong> unen ideas, oraciones o p\'e1rrafos. Ayudan a que el texto sea m\'e1s fluido.</p> <h5 class="font-semibold mt-3 mb-1">De Adici\'f3n (a\'f1aden informaci\'f3n):</h5> <p><strong>and, also, in addition, moreover.</strong> <em>(I like coffee, <strong>and</strong> she likes tea.)</em></p> <h5 class="font-semibold mt-3 mb-1">De Contraste (muestran oposici\'f3n):</h5> <p><strong>but, however, although, on the other hand.</strong> <em>(He is rich, <strong>but</strong> he is not happy.)</em></p> <h5 class="font-semibold mt-3 mb-1">De Causa y Efecto (muestran una raz\'f3n y un resultado):</h5> <p><strong>because, so, therefore, as a result.</strong> <em>(It was raining, <strong>so</strong> I took an umbrella.)</em></p>`, exercises: [ \{ question: "I wanted to go to the beach, ___ it started to rain.", answer: "but" \}, \{ question: "She studied a lot, ___ she passed the exam easily.", answer: "so" \}, \{ question: "He eats vegetables ___ they are healthy.", answer: "because" \} ] \}, \{ topic: "Prepositions of Place", explanation: `<p>Las <strong>preposiciones de lugar</strong> describen la posici\'f3n de algo o alguien.</p><ul class="list-disc list-inside my-2"><li><strong class="text-purple-600">in:</strong> dentro de un espacio cerrado (in the box).</li><li><strong class="text-purple-600">on:</strong> sobre una superficie (on the table).</li><li><strong class="text-purple-600">under:</strong> debajo de algo (under the bed).</li></ul>`, exercises: [ \{ question: "The cat is sleeping ___ the chair.", answer: "on" \}, \{ question: "My keys are ___ my pocket.", answer: "in" \}, ] \} ];\
const scrambleData = [ \{ topic: 'Oraciones B\'e1sicas', sentences: [ ['The', 'cat', 'is', 'on', 'the', 'mat'], ['I', 'like', 'to', 'read', 'books'], ['She', 'plays', 'the', 'piano', 'very', 'well'] ] \}, \{ topic: 'Preguntas Simples', sentences: [ ['What', 'is', 'your', 'name', '?'], ['Where', 'do', 'you', 'live', '?'], ['How', 'old', 'are', 'you', '?'] ] \}, \{ topic: 'Oraciones con Conectores', sentences: [ ['I', 'am', 'tired', 'but', 'I', 'must', 'finish', 'my', 'homework'], ['He', 'is', 'happy', 'because', 'he', 'won', 'the', 'game'] ] \} ];\
const definitionMatchingData = [ \{ topic: "Tecnolog\'eda y Computadores", pairs: [ \{ word: "Keyboard", definition: "A device used to type text into a computer." \}, \{ word: "Monitor", definition: "A screen that displays output from a computer." \}, \{ word: "Software", definition: "The programs and operating information used by a computer." \}, \{ word: "Hardware", definition: "The physical parts of a computer system." \}, \{ word: "Database", definition: "A structured set of data held in a computer." \} ] \} ];\
const translationMatchingData = [ \{ topic: "Animales Comunes", pairs: [ \{ word: "Dog", translation: "Perro" \}, \{ word: "Cat", translation: "Gato" \}, \{ word: "Horse", translation: "Caballo" \}, \{ word: "Bird", translation: "P\'e1jaro" \}, \{ word: "Fish", translation: "Pez" \} ] \}, \{ topic: "Verbos de Rutina Diaria", pairs: [ \{ word: "To wake up", translation: "Despertarse" \}, \{ word: "To eat", translation: "Comer" \}, \{ word: "To work", translation: "Trabajar" \}, \{ word: "To study", translation: "Estudiar" \}, \{ word: "To sleep", translation: "Dormir" \} ] \} ];\
const connectorsData = [ \{ topic: "Conectores de Contraste y Causa", exercises: [ \{ sentence: "She went to the party ___ she was feeling sick.", options: ["although", "because", "so", "if"], answer: "although" \}, \{ sentence: "He studied hard, ___ he passed the exam easily.", options: ["but", "so", "because", "although"], answer: "so" \}, \{ sentence: "We couldn't go to the beach ___ the bad weather.", options: ["so", "because of", "even though", "while"], answer: "because of" \}, \{ sentence: "I will be late for the meeting. ___, I will finish the report.", options: ["However", "Therefore", "Because", "So"], answer: "However" \} ] \} ];\
const studyVocabData = exercisesDataPart1;\
\
const activityDataMap = \{\
    'vocab-quiz': \{ data: studyVocabData, name: "Vocabulario Interactivo", renderFn: renderVocabQuiz \},\
    'scramble-sentences': \{ data: scrambleData, name: "Organizar Oraciones", renderFn: renderScrambleExercise \},\
    'definition-matching': \{ data: definitionMatchingData, name: "Emparejar Definiciones", renderFn: renderMatchingExercise \},\
    'translation-matching': \{ data: translationMatchingData, name: "Emparejar Traducciones", renderFn: renderMatchingExercise \},\
    'connectors-quiz': \{ data: connectorsData, name: "Pr\'e1ctica de Conectores", renderFn: renderConnectorsQuiz \},\
    'grammar-point': \{ data: grammarData, name: "Puntos Gramaticales", renderFn: renderGrammarPoint \}\
\};\
\
\
// ==================================================================\
// =========== PARTE 2: ESTADO GLOBAL Y L\'d3GICA PRINCIPAL ===========\
// ==================================================================\
\
// appState ahora contiene el perfil completo del estudiante,\
// incluyendo su ID de la tabla 'students', no solo el de autenticaci\'f3n.\
const appState = \{\
    studentProfile: null, // contendr\'e1 \{id, user_id, full_name, course, progress\}\
    currentPart: null,\
    currentTopicIndex: null,\
    currentQuizType: null,\
    currentQuestions: [],\
    currentQuestionIndex: 0,\
    score: 0,\
    study: \{ currentActivityId: null, currentActivityName: null, currentTopicIndex: null \},\
    matching: \{ selectedWordEl: null, selectedDefEl: null, correctMatches: 0 \}\
\};\
\
const screens = \{ login: document.getElementById('login-screen'), parts: document.getElementById('parts-screen'), topics: document.getElementById('topics-screen'), quiz: document.getElementById('quiz-screen'), results: document.getElementById('results-screen'), modeSelection: document.getElementById('mode-selection-screen'), study: document.getElementById('study-screen') \};\
\
const shuffleArray = (array) => \{\
    if (!array) return [];\
    return [...array].sort(() => Math.random() - 0.5);\
\}\
\
// ==================================================================\
// =========== PARTE 3: GESTI\'d3N DE DATOS Y ESTADO (NUEVO) ===========\
// ==================================================================\
\
/**\
 * Funci\'f3n principal que se activa cuando cambia el estado de autenticaci\'f3n.\
 * @param \{object\} event - El tipo de evento (e.g., 'SIGNED_IN', 'SIGNED_OUT').\
 * @param \{object\} session - La sesi\'f3n del usuario, que contiene los datos del usuario.\
 */\
onAuthStateChanged(async (event, session) => \{\
    const user = session?.user;\
    updateUserUI(user); // Actualiza la UI para mostrar/ocultar pantallas\
\
    if (user) \{\
        // Usuario ha iniciado sesi\'f3n\
        const data = await loadStudentData(user.id);\
        if (data) \{\
            // Si encontramos datos, los cargamos en el estado de la aplicaci\'f3n\
            appState.studentProfile = \{\
                id: data.id, // ID de la tabla 'students'\
                user_id: data.user_id, // ID de la tabla 'auth.users'\
                full_name: data.full_name,\
                course: data.course,\
                // Aseguramos que el objeto de progreso exista y est\'e9 bien formado\
                progress: data.progress || \{ part1: \{\}, part2: \{\}, part3: \{\}, part4: \{\}, part5: \{\}, part6: \{\}, part7: \{\} \}\
            \};\
            document.getElementById('user-name-display-mode').textContent = appState.studentProfile.full_name;\
        \} else \{\
             // Esto no deber\'eda pasar si usas el admin.html, pero es una salvaguarda.\
            console.error("\'a1Alerta! Usuario autenticado pero sin perfil en la base de datos.");\
        \}\
    \} else \{\
        // Usuario ha cerrado sesi\'f3n, reseteamos el estado.\
        appState.studentProfile = null;\
    \}\
\});\
\
\
// ==================================================================\
// =========== PARTE 4: NAVEGACI\'d3N Y L\'d3GICA DE TU APP (Adaptado) ===========\
// ==================================================================\
\
function showScreen(screenName) \{\
    Object.values(screens).forEach(s => s.classList.remove('active'));\
    const screen = screens[screenName];\
    if (screen) \{\
        screen.classList.add('active', 'animate-fade-in');\
        screen.addEventListener('animationend', () => screen.classList.remove('animate-fade-in'), \{ once: true \});\
    \}\
\}\
\
function init() \{\
    // Ya no hay un formulario de login aqu\'ed, se maneja en auth.js\
    document.getElementById('practice-mode-button').addEventListener('click', () => showScreen('parts'));\
    document.getElementById('study-mode-button').addEventListener('click', () => \{\
        showScreen('study');\
        showStudyMenu();\
    \});\
    document.querySelectorAll('.part-button').forEach(btn => btn.addEventListener('click', handlePartSelection));\
    document.querySelectorAll('.back-to-parts').forEach(btn => btn.addEventListener('click', () => showScreen('parts')));\
    document.querySelectorAll('.back-to-mode').forEach(btn => btn.addEventListener('click', () => showScreen('modeSelection')));\
    document.querySelectorAll('.back-to-topics, #back-to-topics-final').forEach(btn => btn.addEventListener('click', () => renderTopicsScreen()));\
    document.getElementById('retry-button').addEventListener('click', () => startQuiz(appState.currentPart, appState.currentTopicIndex, appState.currentQuizType));\
    document.getElementById('global-help-button').addEventListener('click', showGlobalHelp);\
    \
    // El estado inicial de la UI lo decide onAuthStateChange\
\}\
\
\
// --- El resto de tu c\'f3digo de la aplicaci\'f3n va aqu\'ed, con m\'ednimos cambios ---\
// La mayor\'eda de tus funciones originales se pueden pegar aqu\'ed directamente.\
// Solo modificaremos las partes que interact\'faan con los datos del estudiante.\
\
// ==================================================================\
// =========== PARTE 5: MODO DE ESTUDIO (STUDY MODE) ===========\
// ==================================================================\
// Sin cambios significativos. Esta l\'f3gica es aut\'f3noma.\
function showStudyMenu() \{ renderStudyView('menu'); \}\
function renderStudyView(view) \{\
    const container = document.getElementById('study-activity-container');\
    container.innerHTML = ''; \
    switch (view) \{\
        case 'menu':\
            container.innerHTML = getStudyMenuHTML();\
            document.querySelectorAll('.activity-btn').forEach(button => \{\
                button.onclick = () => \{\
                    const activityId = button.dataset.activity;\
                    appState.study.currentActivityId = activityId;\
                    appState.study.currentActivityName = activityDataMap[activityId].name;\
                    renderStudyView('topics');\
                \};\
            \});\
            break;\
        case 'topics':\
            container.innerHTML = getStudyTopicsHTML();\
            document.querySelectorAll('.topic-btn').forEach(button => \{\
                button.onclick = () => \{\
                    const activityId = appState.study.currentActivityId;\
                    const topicIndex = parseInt(button.dataset.index, 10);\
                    appState.study.currentTopicIndex = topicIndex;\
                    if (activityId === 'grammar-point') \{\
                        showGrammarDetail(topicIndex);\
                    \} else \{\
                        renderStudyView('exercise');\
                    \}\
                \};\
            \});\
            break;\
        case 'exercise':\
            container.innerHTML = getStudyExerciseHTML();\
            const \{ renderFn \} = activityDataMap[appState.study.currentActivityId];\
            renderFn(appState.study.currentTopicIndex, appState.study.currentActivityId);\
            break;\
    \}\
\}\
function getStudyMenuHTML() \{\
    const activities = [\
        \{ id: 'vocab-quiz', name: 'Vocabulario Interactivo', icon: 'fa-spell-check' \},\
        \{ id: 'scramble-sentences', name: 'Organizar Oraciones', icon: 'fa-random' \},\
        \{ id: 'definition-matching', name: 'Emparejar Definiciones', icon: 'fa-link' \},\
        \{ id: 'translation-matching', name: 'Emparejar Traducciones', icon: 'fa-language' \},\
        \{ id: 'connectors-quiz', name: 'Pr\'e1ctica de Conectores', icon: 'fa-puzzle-piece' \},\
        \{ id: 'grammar-point', name: 'Puntos Gramaticales', icon: 'fa-book' \},\
    ];\
    return `\
        <h3 class="text-xl font-bold mb-4 text-center">Men\'fa de Pr\'e1ctica</h3>\
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\
            $\{activities.map(activity => `\
                <button class="activity-btn bg-white border-2 border-blue-200 text-blue-800 p-4 rounded-lg hover:bg-blue-100 transition-all shadow-sm text-left font-bold flex items-center" data-activity="$\{activity.id\}">\
                    <i class="fas $\{activity.icon\} mr-3 text-xl w-6 text-center"></i> <span>$\{activity.name\}</span>\
                </button>\
            `).join('')\}\
        </div>`;\
\}\
function getStudyTopicsHTML() \{\
    const activityId = appState.study.currentActivityId;\
    const \{ data \} = activityDataMap[activityId];\
    const titleText = activityId === 'grammar-point' ? 'Elige un Punto Gramatical' : `Elige un tema de "$\{appState.study.currentActivityName\}"`;\
\
    return `\
        <header class="flex items-center mb-6">\
            <button onclick="window.renderStudyView('menu')" class="text-blue-600 hover:text-blue-800 font-semibold"><i class="fas fa-arrow-left mr-2"></i> Volver al Men\'fa</button>\
        </header>\
        <h3 class="text-xl font-bold mb-4 text-center">$\{titleText\}</h3>\
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="study-topics-grid">\
            $\{data.map((topic, index) => `\
                <button class="topic-btn bg-gray-200 text-gray-800 p-4 rounded-lg hover:bg-gray-300 transition-all shadow-sm text-left font-semibold" data-index="$\{index\}">\
                    $\{topic.topic\}\
                </button>\
            `).join('')\}\
        </div>\
        <div id="grammar-detail-container" class="mt-6"></div>\
        `;\
\}\
function getStudyExerciseHTML() \{\
    const topicData = activityDataMap[appState.study.currentActivityId].data[appState.study.currentTopicIndex];\
    return `\
        <header class="flex items-center mb-6">\
            <button onclick="window.renderStudyView('topics')" class="text-blue-600 hover:text-blue-800 font-semibold"><i class="fas fa-arrow-left mr-2"></i> Volver a Temas</button>\
        </header>\
        <h3 class="text-xl font-bold mb-4 text-center">$\{topicData.topic\}</h3>\
        <div id="exercise-render-area"></div>`;\
\}\
function renderVocabQuiz(topicIndex) \{\
    const exerciseArea = document.getElementById('exercise-render-area');\
    const topicData = studyVocabData[topicIndex];\
    let currentWordIndex = 0;\
    let score = 0;\
\
    function loadQuestion() \{\
        if (currentWordIndex >= topicData.items.length) \{\
            exerciseArea.innerHTML = `<p class="text-green-600 font-bold text-lg text-center">\'a1Felicidades! Completaste el tema. Tu puntaje: $\{score\}/$\{topicData.items.length\}</p>`;\
            return;\
        \}\
        const wordData = topicData.items[currentWordIndex];\
        const correctAnswer = wordData.word;\
        let options = shuffleArray([...topicData.allWords.map(w => w.word)]).filter(w => w !== correctAnswer).slice(0, 3);\
        options.push(correctAnswer);\
        options = shuffleArray(options);\
        \
        exerciseArea.innerHTML = `\
            <div class="p-4 bg-white border rounded-lg shadow">\
                <p class="text-gray-600 font-semibold mb-3">\'bfQu\'e9 palabra corresponde a esta definici\'f3n?</p>\
                <div class="p-3 bg-gray-100 rounded-md mb-4"><p class="text-center text-lg italic">"$\{wordData.description\}"</p></div>\
                <div id="vocab-options" class="grid grid-cols-2 gap-3"></div>\
                <div id="vocab-feedback" class="mt-4 p-2 text-center font-semibold rounded-md min-h-[40px]"></div>\
            </div>`;\
        const optionsContainer = exerciseArea.querySelector('#vocab-options');\
        options.forEach(option => \{\
            const button = document.createElement('button');\
            button.textContent = option;\
            button.className = 'option-btn bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600';\
            button.onclick = () => checkAnswer(button, option, correctAnswer);\
            optionsContainer.appendChild(button);\
        \});\
    \}\
\
    function checkAnswer(button, selectedOption, correctAnswer) \{\
        const feedbackEl = document.getElementById('vocab-feedback');\
        const allOptionBtns = document.querySelectorAll('#vocab-options .option-btn');\
        allOptionBtns.forEach(btn => btn.disabled = true);\
\
        if (selectedOption === correctAnswer) \{\
            button.className = 'option-btn bg-green-600 text-white font-bold py-2 px-4 rounded-lg';\
            feedbackEl.textContent = "\'a1Correcto!";\
            feedbackEl.className = "mt-4 p-2 text-center font-semibold rounded-md min-h-[40px] bg-green-100 text-green-700";\
            score++;\
            setTimeout(() => \{ currentWordIndex++; loadQuestion(); \}, 1500);\
        \} else \{\
            button.className = 'option-btn bg-red-500 text-white font-bold py-2 px-4 rounded-lg';\
            const questionData = topicData.items.find(item => item.word === correctAnswer);\
            const hint = questionData.hint || `Pista: La palabra correcta empieza con la letra '$\{correctAnswer[0]\}'.`;\
            feedbackEl.innerHTML = `<span class="font-bold">Intenta de nuevo.</span> <span class="font-normal">$\{hint\}</span>`;\
            feedbackEl.className = "mt-4 p-2 text-center font-semibold rounded-md min-h-[40px] bg-yellow-100 text-yellow-800";\
            \
            setTimeout(() => \{\
                allOptionBtns.forEach(btn => \{\
                    if (btn.textContent === correctAnswer) \{\
                         btn.className = 'option-btn bg-green-600 text-white font-bold py-2 px-4 rounded-lg ring-4 ring-yellow-300';\
                    \}\
                \});\
                    setTimeout(() => \{ currentWordIndex++; loadQuestion(); \}, 2500);\
            \}, 2000);\
        \}\
    \}\
    loadQuestion();\
\}\
function renderScrambleExercise(topicIndex) \{\
    const container = document.getElementById('exercise-render-area');\
    const topic = scrambleData[topicIndex];\
    let sentenceIndex = 0;\
    function loadSentence() \{\
        if (sentenceIndex >= topic.sentences.length) \{\
            container.innerHTML = `<p class="text-green-600 font-bold text-lg text-center">\'a1Felicidades, completaste todas las oraciones de este tema!</p>`;\
            return;\
        \}\
        const correctSentenceArray = topic.sentences[sentenceIndex];\
        const shuffledWords = shuffleArray([...correctSentenceArray]);\
        container.innerHTML = `\
            <div class="p-4 bg-white border rounded-lg shadow">\
                <p class="text-sm text-gray-600 mb-2 font-semibold">Haz clic en los botones para formar la oraci\'f3n:</p>\
                <div id="scramble-word-bank" class="flex flex-wrap gap-2 items-center justify-center p-3 bg-gray-100 rounded-lg"></div>\
                <div class="mt-4 p-3 border-2 border-gray-400 rounded-lg bg-white shadow-inner min-h-[50px]" id="scramble-answer-zone"></div>\
                <div class="flex justify-center gap-3 mt-4">\
                    <button id="scramble-check-btn" class="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">Revisar</button>\
                    <button id="scramble-clear-btn" class="bg-red-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-700">Limpiar</button>\
                </div>\
                <div id="scramble-feedback" class="mt-3 font-bold h-6 text-center"></div>\
            </div>`;\
        const wordBank = container.querySelector('#scramble-word-bank');\
        const answerZone = container.querySelector('#scramble-answer-zone');\
        shuffledWords.forEach(word => \{\
            const button = document.createElement('button');\
            button.textContent = word;\
            button.className = 'word-btn bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-md shadow hover:bg-yellow-500';\
            button.onclick = () => \{\
                const wordInAnswer = document.createElement('span');\
                wordInAnswer.textContent = word;\
                wordInAnswer.className = 'inline-block bg-purple-200 text-purple-800 font-semibold px-3 py-1 rounded-md mr-2 mb-2';\
                answerZone.appendChild(wordInAnswer);\
                button.disabled = true; button.classList.add('opacity-50', 'cursor-not-allowed');\
            \};\
            wordBank.appendChild(button);\
        \});\
        container.querySelector('#scramble-clear-btn').onclick = () => \{\
            answerZone.innerHTML = '';\
            container.querySelectorAll('#scramble-word-bank .word-btn').forEach(btn => \{\
                btn.disabled = false; btn.classList.remove('opacity-50', 'cursor-not-allowed');\
            \});\
        \};\
        container.querySelector('#scramble-check-btn').onclick = () => \{\
            const userAnswer = Array.from(answerZone.children).map(span => span.textContent).join(' ');\
            const correctAnswer = correctSentenceArray.join(' ');\
            const feedbackEl = container.querySelector('#scramble-feedback');\
            if (userAnswer === correctAnswer) \{\
                feedbackEl.textContent = "\'a1Correcto!";\
                feedbackEl.className = "mt-3 font-bold h-6 text-center text-green-600";\
                setTimeout(() => \{ sentenceIndex++; loadSentence(); \}, 1500);\
            \} else \{\
                feedbackEl.textContent = "No es correcto. \'a1Intenta de nuevo!";\
                feedbackEl.className = "mt-3 font-bold h-6 text-center text-red-600";\
            \}\
        \};\
    \}\
    loadSentence();\
\}\
function renderMatchingExercise(topicIndex, activityType) \{\
    const exerciseArea = document.getElementById('exercise-render-area');\
    const data = activityType === 'definition-matching' ? definitionMatchingData : translationMatchingData;\
    const topicData = data[topicIndex];\
    const pairs = shuffleArray([...topicData.pairs]);\
    let words = pairs.map(p => p.word);\
    let definitions = shuffleArray(pairs.map(p => activityType === 'definition-matching' ? p.definition : p.translation));\
    appState.matching = \{ selectedWordEl: null, selectedDefEl: null, correctMatches: 0 \};\
    exerciseArea.innerHTML = `\
        <div class="p-4 bg-white border rounded-lg shadow">\
            <p class="text-center font-semibold mb-4">Empareja cada palabra de la izquierda con su $\{activityType === 'definition-matching' ? 'definici\'f3n' : 'traducci\'f3n'\} de la derecha.</p>\
            <div class="grid grid-cols-2 gap-4">\
                <div id="matching-words" class="flex flex-col gap-2"></div>\
                <div id="matching-defs" class="flex flex-col gap-2"></div>\
            </div>\
            <p id="matching-feedback" class="text-center mt-4 font-bold text-lg h-6"></p>\
        </div>`;\
    const wordsContainer = exerciseArea.querySelector('#matching-words');\
    const defsContainer = exerciseArea.querySelector('#matching-defs');\
    words.forEach(word => \{\
        const btn = document.createElement('button');\
        btn.textContent = word;\
        btn.className = 'matching-item p-3 bg-blue-100 text-blue-800 rounded-md text-left hover:bg-blue-200 transition-transform';\
        btn.onclick = () => handleSelect(btn, 'word');\
        wordsContainer.appendChild(btn);\
    \});\
    definitions.forEach(def => \{\
        const btn = document.createElement('button');\
        btn.textContent = def;\
        btn.className = 'matching-item p-3 bg-green-100 text-green-800 rounded-md text-left hover:bg-green-200 transition-transform';\
        btn.onclick = () => handleSelect(btn, 'def');\
        defsContainer.appendChild(btn);\
    \});\
    function handleSelect(element, type) \{\
        if (element.classList.contains('matched')) return;\
        const \{ matching \} = appState;\
        if (type === 'word') \{\
            if (matching.selectedWordEl) matching.selectedWordEl.classList.remove('selected');\
            matching.selectedWordEl = element;\
            matching.selectedWordEl.classList.add('selected');\
        \} else \{\
            if (matching.selectedDefEl) matching.selectedDefEl.classList.remove('selected');\
            matching.selectedDefEl = element;\
            matching.selectedDefEl.classList.add('selected');\
        \}\
        if (matching.selectedWordEl && matching.selectedDefEl) checkMatch();\
    \}\
    function checkMatch() \{\
        const \{ matching \} = appState;\
        const wordEl = matching.selectedWordEl, defEl = matching.selectedDefEl;\
        matching.selectedWordEl = null; matching.selectedDefEl = null;\
        if (!wordEl || !defEl) return;\
        const word = wordEl.textContent, definition = defEl.textContent;\
        const correctPair = topicData.pairs.find(p => p.word === word);\
        const correctAnswer = activityType === 'definition-matching' ? correctPair.definition : correctPair.translation;\
        if (definition === correctAnswer) \{\
            wordEl.classList.remove('selected'); defEl.classList.remove('selected');\
            wordEl.classList.add('matched'); defEl.classList.add('matched');\
            matching.correctMatches++;\
        \} else \{\
            wordEl.classList.add('error'); defEl.classList.add('error');\
            setTimeout(() => \{\
                wordEl.classList.remove('error', 'selected');\
                defEl.classList.remove('error', 'selected');\
            \}, 500);\
        \}\
        if (matching.correctMatches === pairs.length) \{\
            document.getElementById('matching-feedback').textContent = '\'a1Excelente! \'a1Has completado todas las parejas!';\
            document.getElementById('matching-feedback').classList.add('text-green-600');\
        \}\
    \}\
\}\
function renderConnectorsQuiz(topicIndex) \{\
    const exerciseArea = document.getElementById('exercise-render-area');\
    const topicData = connectorsData[topicIndex];\
    let currentExIndex = 0;\
    function loadExercise() \{\
        if (currentExIndex >= topicData.exercises.length) \{\
            exerciseArea.innerHTML = `<p class="text-green-600 font-bold text-lg text-center">\'a1Felicidades! Completaste esta secci\'f3n.</p>`;\
            return;\
        \}\
        const ex = topicData.exercises[currentExIndex];\
        const sentenceHtml = ex.sentence.replace('___', '<span class="font-bold text-red-500">___</span>');\
        exerciseArea.innerHTML = `\
            <div class="p-4 bg-white border rounded-lg shadow">\
                <p class="text-lg text-center mb-4">$\{sentenceHtml\}</p>\
                <div id="connectors-options" class="grid grid-cols-2 gap-3"></div>\
                <div id="connectors-feedback" class="mt-3 font-bold h-6 text-center"></div>\
            </div>`;\
        const optionsContainer = exerciseArea.querySelector('#connectors-options');\
        ex.options.forEach(option => \{\
            const button = document.createElement('button');\
            button.textContent = option;\
            button.className = 'option-btn bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600';\
            button.onclick = () => checkAnswer(option);\
            optionsContainer.appendChild(button);\
        \});\
        function checkAnswer(selectedOption) \{\
            const feedbackEl = exerciseArea.querySelector('#connectors-feedback');\
            exerciseArea.querySelectorAll('#connectors-options .option-btn').forEach(btn => \{\
                btn.disabled = true;\
                if(btn.textContent === ex.answer) btn.classList.add('bg-green-600', 'ring');\
            \});\
            if (selectedOption === ex.answer) \{\
                feedbackEl.textContent = "\'a1Correcto!";\
                feedbackEl.className = "mt-3 font-bold h-6 text-center text-green-600";\
            \} else \{\
                feedbackEl.textContent = `Incorrecto. La respuesta es "$\{ex.answer\}"`;\
                feedbackEl.className = "mt-3 font-bold h-6 text-center text-red-600";\
            \}\
            setTimeout(() => \{ currentExIndex++; loadExercise(); \}, 2000);\
        \}\
    \}\
    loadExercise();\
\}\
function renderGrammarPoint(topicIndex, activityId) \{\
    const container = document.getElementById('grammar-detail-container');\
    const item = grammarData[topicIndex];\
    document.getElementById('study-topics-grid').style.display = 'none'; // Hide topics\
    let html = `<div class="text-left p-4 bg-gray-50 rounded-lg border"><h4 class="text-lg font-bold text-gray-800 mb-2">$\{item.topic\}</h4>$\{item.explanation\}</div>`;\
    if (item.exercises) \{\
        html += `<h5 class="font-bold mt-6 mb-3 text-left">\'a1A Practicar!</h5>`;\
        item.exercises.forEach((ex, exIndex) => \{\
            const exerciseId = `grammar-ex-$\{topicIndex\}-$\{exIndex\}`;\
            html += `<div class="mb-3 p-3 bg-white border rounded-lg text-left"><label for="$\{exerciseId\}" class="block text-sm text-gray-700 mb-2">$\{ex.question.replace('___', '<span class="font-mono">___</span>')\}</label><div class="flex items-center"><input type="text" id="$\{exerciseId\}" class="w-full md:w-1/2 px-3 py-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><button onclick="window.checkGrammarAnswer('$\{exerciseId\}', '$\{ex.answer\}')" class="ml-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm">Revisar</button><span id="$\{exerciseId\}-feedback" class="ml-3 font-semibold text-lg"></span></div></div>`;\
        \});\
    \}\
    container.innerHTML = html;\
\}\
function showGrammarDetail(topicIndex) \{ renderGrammarPoint(topicIndex, 'grammar-point'); \}\
\
// ==================================================================\
// =========== PARTE 6: MODO PR\'c1CTICA DE EXAMEN ===========\
// ==================================================================\
function handlePartSelection(e) \{ appState.currentPart = e.target.dataset.part; renderTopicsScreen(); \}\
\
function renderTopicsScreen() \{\
    if (!appState.studentProfile) \{\
        alert("Error: No se han cargado los datos del estudiante.");\
        return;\
    \}\
    const headerInfo = document.getElementById('student-info-header');\
    headerInfo.children[0].textContent = appState.studentProfile.full_name;\
    headerInfo.children[1].textContent = `Curso: $\{appState.studentProfile.course\}`;\
    const container = document.getElementById('topic-selection');\
    container.innerHTML = '';\
    let data = [], title = '', part = appState.currentPart;\
    if (part === '1') \{ title = 'Part 1: Vocabulary Matching'; data = exercisesDataPart1.map((item, index) => (\{ ...item, type: 'part1', originalIndex: index \})); \}\
    else if (part === '2') \{ title = 'Part 2: Conversations & Notices'; const notices = exercisesDataPart2.notices.map((item, index) => (\{ ...item, type: 'notice', originalIndex: index, subtitle: 'Notices' \})); const convos = exercisesDataPart2.conversations.map((item, index) => (\{ ...item, type: 'convo', originalIndex: index, subtitle: 'Conversations' \})); data = [...notices, ...convos]; \}\
    else if (part === '3') \{ title = 'Part 3: Completing Conversations'; data = exercisesDataPart3.map((item, index) => (\{ ...item, type: 'part3', originalIndex: index \})); \}\
    else if (part === '4') \{ title = 'Part 4: Reading Comprehension'; data = exercisesDataPart4.map((item, index) => (\{ ...item, topic: item.topic, type: 'part4', originalIndex: index \})); \}\
    else if (part === '5') \{ title = 'Part 5: Fill in the Blanks'; data = exercisesDataPart5.map((item, index) => (\{ ...item, type: 'part5', originalIndex: index \})); \}\
    else if (part === '6') \{ title = 'Part 6: Reading Comprehension'; data = exercisesDataPart6.map((item, index) => (\{ ...item, topic: item.topic, type: 'part6', originalIndex: index \})); \}\
    else if (part === '7') \{ title = 'Part 7: Fill in the Blanks'; data = exercisesDataPart7.map((item, index) => (\{...item, type: 'part7', originalIndex: index \})); \}\
    \
    // **MODIFICACI\'d3N CLAVE**: Usamos el progreso del perfil del estudiante\
    const progressData = appState.studentProfile.progress[`part$\{part\}`] || \{\};\
\
    document.getElementById('topics-title').textContent = title;\
    container.className = "grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4";\
    data.forEach((exercise) => \{\
        const button = document.createElement('button');\
        const progressKey = `$\{exercise.type\}-$\{exercise.originalIndex\}`, score = progressData[progressKey], isCompleted = !!score;\
        button.className = `topic-button text-left p-3 md:p-4 rounded-lg border-2 transition-all transform hover:scale-105 shadow-sm $\{isCompleted ? 'completed' : 'bg-white border-blue-200'\}`;\
        let scoreInfo = isCompleted ? `<div class="mt-2 text-xs md:text-sm text-gray-700 font-semibold flex items-center"><span class="text-green-600 mr-2">\uc0\u9989 </span><span>\'daltimo: $\{score\}</span></div>` : '';\
        button.innerHTML = `$\{exercise.subtitle ? `<p class="text-xs font-semibold text-gray-500">$\{exercise.subtitle\}</p>` : ''\}<span class="font-bold text-base md:text-lg text-blue-800">$\{exercise.topic\}</span>$\{scoreInfo\}`;\
        button.onclick = () => startQuiz(part, exercise.originalIndex, exercise.type);\
        container.appendChild(button);\
    \});\
    showScreen('topics');\
\}\
\
function startQuiz(part, topicIndex, quizType) \{\
    appState.currentPart = part; appState.currentTopicIndex = topicIndex; appState.currentQuizType = quizType;\
    appState.currentQuestionIndex = 0; appState.score = 0;\
    let data;\
    if (part === '1') data = exercisesDataPart1[topicIndex];\
    else if (quizType === 'convo') data = exercisesDataPart2.conversations[topicIndex];\
    else if (quizType === 'notice') data = exercisesDataPart2.notices[topicIndex];\
    else if (part === '3') data = exercisesDataPart3[topicIndex];\
    else if (part === '4') data = exercisesDataPart4[topicIndex];\
    else if (part === '5') data = exercisesDataPart5[topicIndex];\
    else if (part === '6') data = exercisesDataPart6[topicIndex];\
    else if (part === '7') data = exercisesDataPart7[topicIndex];\
    let questionsToAsk = (part === '4' || part === '5' || part === '6' || part === '7') ? data.items : shuffleArray(data.items);\
    if (part !== '4' && part !== '5' && part !== '6' && part !== '7') questionsToAsk = questionsToAsk.slice(0, 5);\
    if (part === '6') questionsToAsk = shuffleArray(data.items).slice(0, 5);\
    appState.currentQuestions = questionsToAsk;\
    displayQuestion(); showScreen('quiz');\
\}\
\
function displayQuestion() \{\
    if (appState.currentQuestionIndex >= appState.currentQuestions.length) \{ showResults(); return; \}\
    document.getElementById('question-counter').textContent = `Pregunta $\{appState.currentQuestionIndex + 1\} de $\{appState.currentQuestions.length\}`;\
    document.getElementById('progress-bar').style.width = `$\{((appState.currentQuestionIndex) / appState.currentQuestions.length) * 100\}%`;\
    const quizType = appState.currentQuizType;\
    if (quizType === 'part1') displayQuestionPart1();\
    else if (quizType === 'convo') displayQuestionPart2Convo();\
    else if (quizType === 'notice') displayQuestionPart2Notice();\
    else if (quizType === 'part3') displayQuestionPart3();\
    else if (quizType === 'part4' || quizType === 'part6') displayQuestionPart4();\
    else if (quizType === 'part5' || quizType === 'part7') displayQuestionPart5();\
    updateGlobalHelp();\
\}\
\
function handleOptionClick(event, selected) \{\
    document.querySelectorAll('.option-button').forEach(btn => btn.classList.add('disabled'));\
    const clickedButton = event.currentTarget;\
    const question = appState.currentQuestions[appState.currentQuestionIndex];\
    let correctText = question.answer;\
    if (appState.currentPart === '1') \{ correctText = question.word; \}\
    else if (appState.currentPart !== '5' && appState.currentPart !== '7') \{\
        const correctIndex = correctText.charCodeAt(0) - 65;\
        correctText = question.options[correctIndex];\
    \}\
    if (selected === correctText) \{\
        appState.score++;\
        clickedButton.classList.add('correct');\
    \} else \{\
        clickedButton.classList.add('incorrect');\
        const correctButton = Array.from(document.querySelectorAll('.option-button')).find(btn => btn.dataset.optionText === correctText);\
        if (correctButton) correctButton.classList.add('correct');\
    \}\
    setTimeout(() => \{ appState.currentQuestionIndex++; displayQuestion(); \}, 2000);\
\}\
\
function displayQuestionPart1() \{\
    const question = appState.currentQuestions[appState.currentQuestionIndex];\
    const exercise = exercisesDataPart1[appState.currentTopicIndex];\
    document.getElementById('question-area').innerHTML = `<p class="text-xl text-gray-800">$\{question.description\}</p>`;\
    const correctAnswer = question.word;\
    const distractors = exercise.allWords.filter(w => w.word !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);\
    const options = shuffleArray([correctAnswer, ...distractors.map(d => d.word)]);\
    const optionsArea = document.getElementById('options-area');\
    optionsArea.className = "grid grid-cols-2 gap-3 md:gap-4";\
    optionsArea.innerHTML = '';\
    options.forEach(word => \{\
        const button = document.createElement('button');\
        button.className = 'option-button flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-left';\
        button.dataset.optionText = word;\
        button.innerHTML = `<span class="font-semibold text-blue-800">$\{word\}</span><button class="help-icon text-blue-400 hover:text-blue-600" onclick="event.stopPropagation(); window.showWordHelp('$\{word\}')"><i class="fas fa-question-circle"></i></button>`;\
        button.onclick = (e) => handleOptionClick(e, word);\
        optionsArea.appendChild(button);\
    \});\
\}\
function displayQuestionPart2Convo() \{ const question = appState.currentQuestions[appState.currentQuestionIndex]; const dialogueHtml = question.dialogue.map(line => `<p class="text-lg">$\{line\}</p>`).join(''); document.getElementById('question-area').innerHTML = `<div class="bg-gray-50 p-4 rounded-lg border space-y-2 text-left md:text-center">$\{dialogueHtml\}</div><p class="mt-4 font-bold text-blue-700">$\{question.question\}</p>`; renderOptionsGeneric(question); \}\
function displayQuestionPart2Notice() \{ const question = appState.currentQuestions[appState.currentQuestionIndex]; document.getElementById('question-area').innerHTML = `<div class="border-4 border-gray-700 p-4 font-mono text-xl uppercase">$\{question.notice\}</div> <p class="mt-4 font-bold text-blue-700">$\{question.question\}</p>`; renderOptionsGeneric(question); \}\
function displayQuestionPart3() \{ const question = appState.currentQuestions[appState.currentQuestionIndex]; document.getElementById('question-area').innerHTML = `<div class="space-y-2 text-left md:text-center text-lg">$\{question.dialogue\}</div>`; renderOptionsGeneric(question); \}\
function displayQuestionPart4() \{ const questionArea = document.getElementById('question-area'); const question = appState.currentQuestions[appState.currentQuestionIndex]; const data = appState.currentPart === '4' ? exercisesDataPart4 : exercisesDataPart6; const exercise = data[appState.currentTopicIndex]; if (appState.currentQuestionIndex === 0) \{ questionArea.dataset.fullText = exercise.text; \} const processedText = questionArea.dataset.fullText.replace(/<vocab-word data-def='(.*?)'>(.*?)<\\/vocab-word>/g, (match, def, word) => `<span class="vocab-word" onclick="window.showVocabHelp('$\{word\}', '$\{def\}')">$\{word\}</span>`); questionArea.innerHTML = `<div class="w-full"><div class="reading-text bg-gray-50 border p-4 rounded-lg text-left mb-6"><h3 class="font-bold text-xl mb-4 text-gray-800">$\{exercise.topic\}</h3><div class="prose max-w-none text-gray-700 leading-relaxed">$\{processedText\}</div></div><p class="font-bold text-blue-800 text-left text-lg flex-1">$\{question.question\}</p></div>`; renderOptionsGeneric(question, 'p-3 text-sm'); \}\
function displayQuestionPart5() \{ const questionArea = document.getElementById('question-area'); const question = appState.currentQuestions[appState.currentQuestionIndex]; const exercise = (appState.currentPart === '5') ? exercisesDataPart5[appState.currentTopicIndex] : exercisesDataPart7[appState.currentTopicIndex]; if (appState.currentQuestionIndex === 0) \{ questionArea.dataset.fullText = exercise.text; \} let textWithBlanks = questionArea.dataset.fullText.replace(/<vocab-word data-def='(.*?)'>(.*?)<\\/vocab-word>/g, (match, def, word) => `<span class="vocab-word" onclick="window.showVocabHelp('$\{word\}', '$\{def\}')">$\{word\}</span>`); textWithBlanks = textWithBlanks.replace(/__\\((\\d+)\\)__/g, (match, p1) => \{ const blankIndex = parseInt(p1, 10); const isCurrent = blankIndex === question.id; return `<span class="blank-space $\{isCurrent ? 'current-blank' : ''\}"><b>$\{blankIndex\}</b></span>`; \}); questionArea.innerHTML = `<div class="w-full"><div class="reading-text bg-gray-50 border p-4 rounded-lg text-left mb-6"><h3 class="font-bold text-xl mb-4 text-gray-800">$\{exercise.topic\}</h3><div class="prose max-w-none text-gray-700 leading-relaxed">$\{textWithBlanks.replace('__(0)__', `<span class="blank-space $\{question.id === 0 ? 'current-blank' : ''\}"><b>0</b></span>`)\}</div></div><p class="font-bold text-blue-800 text-left text-lg flex-1">Select the correct word for blank <span class="current-blank px-2">$\{question.id\}</span>.</p></div>`; const options = (appState.currentPart === '5' || appState.currentPart === '7') ? question.options : exercise.words; renderOptionsGeneric(\{ ...question, options \}, 'p-3', true); \}\
function renderOptionsGeneric(question, paddingClass = 'p-4', isFillInTheBlank = false) \{ const optionsArea = document.getElementById('options-area'); optionsArea.className = "grid grid-cols-1 gap-3 mt-4"; if (appState.currentPart === '4' || appState.currentPart === '6') optionsArea.className += " md:grid-cols-1"; else if (isFillInTheBlank) optionsArea.className = "grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"; optionsArea.innerHTML = ''; const shuffledOptions = shuffleArray(question.options); shuffledOptions.forEach((optionText, index) => \{ const optionLetter = String.fromCharCode(65 + index); const button = document.createElement('button'); button.className = `option-button flex items-center bg-white $\{paddingClass\} rounded-lg shadow-sm border border-gray-200 text-left`; button.dataset.optionText = optionText; let optionHelpIcon = ''; if (question.optionHints && question.optionHints[optionText]) \{ optionHelpIcon = `<i class="fas fa-info-circle text-gray-400 ml-2" onclick="event.stopPropagation(); openHelpModalGeneric('$\{question.optionHints[optionText]\}')"></i>`; \} button.innerHTML = `<span class="font-bold text-blue-800 mr-4">$\{optionLetter\}.</span><span class="flex-1">$\{optionText\}</span>$\{optionHelpIcon\}`; button.onclick = (e) => handleOptionClick(e, optionText); optionsArea.appendChild(button); \}); \}\
\
function showResults() \{\
    if (!appState.studentProfile) return;\
    document.getElementById('progress-bar').style.width = '100%';\
    const finalScore = `$\{appState.score\}/$\{appState.currentQuestions.length\}`;\
    const progressKey = `$\{appState.currentQuizType\}-$\{appState.currentTopicIndex\}`;\
    \
    // **MODIFICACI\'d3N CLAVE**: Guardamos el progreso en el perfil del estudiante.\
    appState.studentProfile.progress[`part$\{appState.currentPart\}`][progressKey] = finalScore;\
    saveStudentProgress(appState.studentProfile);\
    \
    // **MODIFICACI\'d3N CLAVE**: Registramos la actividad.\
    const activityDescription = `Complet\'f3 el tema '$\{topicName\}' de la Parte $\{appState.currentPart\} con un resultado de $\{finalScore\}.`;\
    logActivity(appState.studentProfile.id, activityDescription);\
\
    let data, topicName; \
    const \{ currentPart, currentQuizType, currentTopicIndex \} = appState;\
    if (currentPart === '1') data = exercisesDataPart1; else if (currentPart === '3') data = exercisesDataPart3; else if (currentPart === '4') data = exercisesDataPart4; else if (currentPart === '5') data = exercisesDataPart5; else if (currentPart === '6') data = exercisesDataPart6; else if (currentPart === '7') data = exercisesDataPart7; else data = (currentQuizType === 'convo') ? exercisesDataPart2.conversations : exercisesDataPart2.notices;\
    topicName = data[currentTopicIndex].topic;\
    \
    document.getElementById('result-part').textContent = `Parte $\{currentPart\}`;\
    document.getElementById('result-topic').textContent = topicName;\
    document.getElementById('result-student-name').textContent = appState.studentProfile.full_name;\
    document.getElementById('result-student-course').textContent = appState.studentProfile.course;\
    document.getElementById('result-score').textContent = finalScore;\
    const scoreRatio = appState.score / appState.currentQuestions.length;\
    const resultIcon = document.getElementById('result-icon');\
    if (scoreRatio >= 0.8) \{ resultIcon.className = 'fas fa-trophy text-6xl mb-4 text-yellow-400'; \}\
    else if (scoreRatio >= 0.5) \{ resultIcon.className = 'fas fa-thumbs-up text-6xl mb-4 text-green-500'; \}\
    else \{ resultIcon.className = 'fas fa-book-reader text-6xl mb-4 text-red-500'; \}\
    showScreen('results');\
\}\
\
// ==================================================================\
// =========== PARTE 7: MODAL DE AYUDA (sin cambios) ===========\
// ==================================================================\
function updateGlobalHelp() \{ const helpButton = document.getElementById('global-help-button'); const question = appState.currentQuestions[appState.currentQuestionIndex]; let hasHelp = question && (question.help || appState.currentQuizType === 'part1'); helpButton.classList.toggle('hidden', !hasHelp); \}\
function showGlobalHelp() \{ const question = appState.currentQuestions[appState.currentQuestionIndex]; if (!question) return; if (appState.currentPart === '1') \{ openHelpModalGeneric("Selecciona el \'edcono de ayuda (\uc0\u10067 ) junto a cada palabra para ver su definici\'f3n, imagen y un ejemplo."); \} else if (appState.currentPart === '4' || appState.currentPart === '6') \{ openHelpModalPart4(question.help, question.hintFragment); \} else if (question.help) \{ openHelpModalGeneric(question.help); \} \}\
function showWordHelp(word) \{ const exercise = exercisesDataPart1[appState.currentTopicIndex]; const wordData = exercise.allWords.find(w => w.word === word); if(wordData) \{ openHelpModalPart1(wordData); \} \}\
const helpModal = document.getElementById('help-modal');\
function openHelpModalPart1(data) \{ document.getElementById('modal-title').textContent = data.word.charAt(0).toUpperCase() + data.word.slice(1); document.getElementById('modal-body').innerHTML = `<img src="$\{data.image\}" alt="Imagen de ayuda" class="w-full h-48 object-cover rounded-md mb-4 mx-auto border" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/64748b?text=Imagen';"><p class="text-gray-700 mb-4">$\{data.sentence.replace(/\\*(.*?)\\*/g, '<strong class="text-indigo-600">$1</strong>')\}</p><button id="pronounce-btn-modal" data-word="$\{data.word\}" class="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"><i class="fas fa-volume-up mr-2"></i>Escuchar</button>`; document.getElementById('pronounce-btn-modal').onclick = (e) => \{ if ('speechSynthesis' in window) \{ const u = new SpeechSynthesisUtterance(e.currentTarget.dataset.word); u.lang = 'en-US'; window.speechSynthesis.speak(u); \} \}; helpModal.classList.remove('hidden'); \}\
function openHelpModalGeneric(helpText) \{ document.getElementById('modal-title').textContent = "Pista"; document.getElementById('modal-body').innerHTML = `<p class="text-gray-700 text-lg">$\{helpText.replace(/\\*(.*?)\\*/g, '<strong class="text-indigo-600">$1</strong>')\}</p>`; helpModal.classList.remove('hidden'); \}\
function openHelpModalPart4(helpText, hintFragment) \{ document.getElementById('modal-title').textContent = "Pista de Lectura"; document.getElementById('modal-body').innerHTML = `<div class="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-md mb-4"><p class="font-semibold text-yellow-800">Presta atenci\'f3n al inicio de este fragmento:</p><p class="text-gray-700 italic mt-1">"$\{hintFragment\}"</p></div><p class="text-gray-700 text-lg">$\{helpText.replace(/\\*(.*?)\\*/g, '<strong class="text-indigo-600">$1</strong>')\}</p>`; helpModal.classList.remove('hidden'); \}\
function showVocabHelp(word, definition) \{ document.getElementById('modal-title').textContent = word; document.getElementById('modal-body').innerHTML = `<p class="text-gray-700 text-lg">$\{definition\}</p>`; helpModal.classList.remove('hidden'); \}\
document.getElementById('close-modal-button').addEventListener('click', () => helpModal.classList.add('hidden'));\
helpModal.addEventListener('click', (e) => \{ if (e.target.id === 'help-modal') helpModal.classList.add('hidden'); \});\
\
// ==================================================================\
// =========== PARTE 8: INICIALIZACI\'d3N Y FUNCIONES GLOBALES ===========\
// ==================================================================\
window.renderStudyView = renderStudyView;\
window.checkGrammarAnswer = function(inputId, correctAnswer) \{\
    const input = document.getElementById(inputId);\
    const feedback = document.getElementById(`$\{inputId\}-feedback`);\
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) \{\
        feedback.innerHTML = '\uc0\u9989 '; input.classList.add('border-green-500','ring-green-200'); input.classList.remove('border-red-500','ring-red-200');\
    \} else \{\
        feedback.innerHTML = '\uc0\u10060 '; input.classList.add('border-red-500','ring-red-200'); input.classList.remove('border-green-500','ring-green-200');\
    \}\
\}\
window.showWordHelp = showWordHelp;\
window.showVocabHelp = showVocabHelp;\
\
// Iniciar la aplicaci\'f3n cuando el DOM est\'e9 completamente cargado.\
document.addEventListener('DOMContentLoaded', init);\
}