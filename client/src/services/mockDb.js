import StorageService from '../core/classes/StorageService';
import LoggerService from '../core/classes/LoggerService';

const logger = new LoggerService('MockDatabase');

class MockDatabase {
  constructor() {
    
    this.STORAGE_KEY = 'etest_mock_db'; 
    this.init();
  }

  init() {
    const existingData = StorageService.get(this.STORAGE_KEY);
    if (existingData) {
      this.data = existingData;
      logger.info("Loaded enterprise relational schema from local persistence.");
    } else {
      this.data = {
        users: [
          { username: "admin", password: "125", role: "teacher", name: "Professor Smith" }
        ],
        exams: [
          {
            id: "cs-101",
            title: "Introduction to Computer Science",
            status: "Active",
            durationMinutes: 5, 
            questions: [
              { id: 1, text: "What is the time complexity of searching in a perfectly balanced Binary Search Tree (BST)?", options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"], answer: "O(log N)" },
              { id: 2, text: "Which HTTP method is typically used to update an existing resource safely?", options: ["GET", "POST", "PUT", "DELETE"], answer: "PUT" },
              { id: 3, text: "Which data structure operates on a strict Last-In, First-Out (LIFO) basis?", options: ["Queue", "Stack", "Linked List", "Graph"], answer: "Stack" },
              { id: 4, text: "Which hardware component is primarily responsible for performing arithmetic and logical operations?", options: ["RAM", "ALU", "Control Unit", "BIOS"], answer: "ALU" },
              { id: 5, text: "Which of the following is NOT considered a core pillar of Object-Oriented Programming (OOP)?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"], answer: "Compilation" },
              { id: 6, text: "What type of computer memory is volatile and loses its data when power is turned off?", options: ["ROM", "RAM", "Flash Memory", "Hard Drive"], answer: "RAM" },
              { id: 7, text: "Which number system uses base-16 representing digits from 0 to 9 and letters A to F?", options: ["Binary", "Octal", "Decimal", "Hexadecimal"], answer: "Hexadecimal" },
              { id: 8, text: "Which standard sorting algorithm guarantees an O(N log N) time complexity in its worst-case scenario?", options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"], answer: "Merge Sort" },
              { id: 9, text: "Which Git command is utilized to duplicate an existing remote repository onto your local workstation?", options: ["git push", "git commit", "git clone", "git merge"], answer: "git clone" },
              { id: 10, text: "Which network protocol is designated for transferring encrypted secure web traffic over the Internet?", options: ["HTTP", "FTP", "SMTP", "HTTPS"], answer: "HTTPS" }
            ]
          },
          {
            id: "react-200",
            title: "Frontend Frameworks & React Architecture",
            status: "Active",
            durationMinutes: 10,
            questions: [
              { id: 1, text: "What is the primary architectural purpose of the React Virtual DOM engine?", options: ["To store configurations", "To minimize direct manipulation of the heavy browser DOM", "To bypass async calls", "To compile CSS"], answer: "To minimize direct manipulation of the heavy browser DOM" },
              { id: 2, text: "Which built-in React Hook is specifically designed to isolate and orchestrate asynchronous side-effects?", options: ["useState", "useMemo", "useEffect", "useCallback"], answer: "useEffect" },
              { id: 3, text: "In React development contexts, what is the meaning of conditional rendering expressions?", options: ["Compiling SASS tools", "Injecting inline styles", "Rendering UI modules based on dynamic state logic", "Mapping over arrays"], answer: "Rendering UI modules based on dynamic state logic" },
              { id: 4, text: "Which feature allows you to pass global state values down a deeply nested component tree without prop-drilling?", options: ["Props", "Redux Thunk", "Context API", "Sass Modules"], answer: "Context API" },
              { id: 5, text: "React state batching updates are structurally processed as what type of operation?", options: ["Synchronous", "Asynchronous", "Multi-threaded", "Blocking"], answer: "Asynchronous" },
              { id: 6, text: "What is the term for immutable data records passed into a child component from its parent block?", options: ["State", "Variables", "Props", "Hooks"], answer: "Props" },
              { id: 7, text: "Why is the unique 'key' prop critically mandatory when rendering arrays of components dynamically?", options: ["To apply custom CSS", "To help React identify which items changed, added, or removed", "To bind click events", "To instantiate local state"], answer: "To help React identify which items changed, added, or removed" },
              { id: 8, text: "Which hook should you implement to memoize the computed output of an expensive mathematical computation?", options: ["useRef", "useMemo", "useEffect", "useReducer"], answer: "useMemo" },
              { id: 9, text: "What is the correct hook used to reference a persistent mutable value or capture a direct reference to a DOM node?", options: ["useState", "useContext", "useRef", "useId"], answer: "useRef" },
              { id: 10, text: "What is the default package manager distributed natively alongside Node.js environments?", options: ["Yarn", "Bower", "pnpm", "npm"], answer: "npm" }
            ]
          },
          {
            id: "math-202",
            title: "Advanced Algebra & Calculus Basics",
            status: "Active",
            durationMinutes: 15,
            questions: [
              { id: 1, text: "What is the derivative of f(x) = 3x^2 + 5x with respect to variable x?", options: ["3x + 5", "6x^2", "6x + 5", "6x"], answer: "6x + 5" },
              { id: 2, text: "Solve for the value of x in the exponential equation: 2^(x+1) = 16.", options: ["2", "3", "4", "5"], answer: "3" },
              { id: 3, text: "Evaluate the limit of the trigonometric expression sin(x)/x as variable x approaches 0.", options: ["0", "1", "Infinity", "Undefined"], answer: "1" },
              { id: 4, text: "What is the numerical approximation of the mathematical constant Pi rounded to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
              { id: 5, text: "What is the exact square root calculation of the integer value 144?", options: ["10", "11", "12", "14"], answer: "12" },
              { id: 6, text: "What is a matrix called when it contains 1s along the main diagonal and 0s in all other elements?", options: ["Zero Matrix", "Vector Matrix", "Identity Matrix", "Square Matrix"], answer: "Identity Matrix" },
              { id: 7, text: "What is the calculated indefinite integral of the function f(x) = 2x dx?", options: ["x^2 + C", "2x^2 + C", "x + C", "2 + C"], answer: "x^2 + C" },
              { id: 8, text: "Identify the absolute prime number from the following group of integers: 9, 15, 17, 21.", options: ["9", "15", "17", "21"], answer: "17" },
              { id: 9, text: "What is the universal sum of all interior angles measured inside a Euclidean triangle?", options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"], answer: "180 degrees" },
              { id: 10, text: "What is the foundational algebraic formula designated by the Pythagorean Theorem?", options: ["a+b=c", "a^2 - b^2 = c^2", "a^2 + b^2 = c^2", "ab = c^2"], answer: "a^2 + b^2 = c^2" }
            ]
          },
          {
            id: "geo-301",
            title: "World Geography & Planetary Topography",
            status: "Active",
            durationMinutes: 12,
            questions: [
              { id: 1, text: "Which river system is officially recognized as the absolute longest river on Planet Earth?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], answer: "Nile River" },
              { id: 2, text: "What is the sovereign federal capital city of the continent country of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
              { id: 3, text: "Which ocean represents the absolute deepest body of water mapped on the planet?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
              { id: 4, text: "What is geographically recognized as the largest desert environment on Earth?", options: ["Sahara Desert", "Gobi Desert", "Antarctic Desert", "Arabian Desert"], answer: "Antarctic Desert" },
              { id: 5, text: "Which sovereign nation currently holds the largest recorded human population index?", options: ["USA", "India", "China", "Brazil"], answer: "India" },
              { id: 6, text: "Which massive continental mountain range system contains the peak elevation of Mount Everest?", options: ["Andes", "Alps", "Rockies", "Himalayas"], answer: "Himalayas" },
              { id: 7, text: "What is the capital city of the nation of Japan?", options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"], answer: "Tokyo" },
              { id: 8, text: "Which micro-state represents the absolute smallest sovereign country by landmass area?", options: ["Monaco", "Malta", "San Marino", "Vatican City"], answer: "Vatican City" },
              { id: 9, text: "Which artificial maritime canal links the Mediterranean Sea directly into the Red Sea?", options: ["Panama Canal", "Suez Canal", "Erie Canal", "Kiel Canal"], answer: "Suez Canal" },
              { id: 10, text: "What is the name of the geodetic line dividing the Earth into Northern and Southern hemispheres?", options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Antarctic Circle"], answer: "Equator" }
            ]
          },
          {
            id: "hist-105",
            title: "Modern World History & Global Conflicts",
            status: "Active",
            durationMinutes: 15,
            questions: [
              { id: 1, text: "In which calendar year did World War I officially conclude with the active armistice signing?", options: ["1914", "1916", "1918", "1920"], answer: "1918" },
              { id: 2, text: "Who was selected to serve as the first official constitutional President of the United States?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], answer: "George Washington" },
              { id: 3, text: "Which historical calendar year marked the violent storming of the Bastille and the start of the French Revolution?", options: ["1776", "1789", "1804", "1815"], answer: "1789" },
              { id: 4, text: "Which ancient civilization was ruled by Julius Caesar before transitioning into an Empire?", options: ["Greek Civilization", "Egyptian Empire", "Roman Republic", "Persian Empire"], answer: "Roman Republic" },
              { id: 5, text: "Which European nation gifted the colossal Statue of Liberty structure to the United States?", options: ["Great Britain", "Germany", "France", "Italy"], answer: "France" },
              { id: 6, text: "In which landmark modern year did the Berlin Wall officially collapse, leading to German reunification?", options: ["1985", "1989", "1991", "1993"], answer: "1989" },
              { id: 7, text: "Which maritime navigator commanded the 1492 transatlantic voyage that arrived in the Americas?", options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "James Cook"], answer: "Christopher Columbus" },
              { id: 8, text: "Which civil rights leader delivered the iconic 'I Have a Dream' speech in Washington D.C.?", options: ["Malcolm X", "Martin Luther King Jr.", "Nelson Mandela", "Rosa Parks"], answer: "Martin Luther King Jr." },
              { id: 9, text: "Which ancient river valley civilization is globally renowned for engineering the Giza Pyramids?", options: ["Mesopotamian", "Indus Valley", "Mayan", "Egyptian"], answer: "Egyptian" },
              { id: 10, text: "In which year did World War II conclude following global surrenders?", options: ["1918", "1939", "1941", "1945"], answer: "1945" }
            ]
          },
          {
            id: "lit-400",
            title: "Classical English Literature & Analysis",
            status: "Active",
            durationMinutes: 15,
            questions: [
              { id: 1, text: "Who composed the world-renowned classical tragic theater production titled 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
              { id: 2, text: "What is the identity of the central protagonist character operating inside George Orwell's novel '1984'?", options: ["Winston Smith", "Holden Caulfield", "Jay Gatsby", "Arthur Dent"], answer: "Winston Smith" },
              { id: 3, text: "Which female author published the highly regarded romantic novel 'Pride and Prejudice'?", options: ["Charlotte Bronte", "Mary Shelley", "Jane Austen", "Virginia Woolf"], answer: "Jane Austen" },
              { id: 4, text: "Which classical epic poem authored by Homer chronicles the extensive events of the historical Trojan War?", options: ["The Odyssey", "The Iliad", "The Aeneid", "Beowulf"], answer: "The Iliad" },
              { id: 5, text: "Who is the true creator of the physiological monster entity inside Mary Shelley's gothic sci-fi novel?", options: ["Dr. Frankenstein", "The Monster itself", "Count Dracula", "Dr. Jekyll"], answer: "Dr. Frankenstein" },
              { id: 6, text: "Which prominent American author published the Jazz Age literary masterpiece 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], answer: "F. Scott Fitzgerald" },
              { id: 7, text: "What is the name of the magical institutional castle academy featured throughout the Harry Potter universe?", options: ["Narnia", "Middle-Earth", "Hogwarts", "Camelot"], answer: "Hogwarts" },
              { id: 8, text: "What is the identity of the mysterious rogue submarine captain steering the Nautilus vessel in Jules Verne's novel?", options: ["Captain Ahab", "Captain Hook", "Captain Nemo", "Captain Flint"], answer: "Captain Nemo" },
              { id: 9, text: "Which brilliant fictional consulting detective resides at the address of 221B Baker Street in London?", options: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Inspector Clouseau"], answer: "Sherlock Holmes" },
              { id: 10, text: "The famous literary creature entity known as 'Moby Dick' belongs to what specific animal category?", options: ["Giant Squid", "Great White Shark", "Sperm Whale", "Kraken"], answer: "Sperm Whale" }
            ]
          }
        ],
        studentScores: [
          { studentName: "Emma Watson", examId: "cs-101", score: 100, responses: { 0: "O(log N)", 1: "PUT", 2: "Stack", 3: "ALU", 4: "Compilation", 5: "RAM", 6: "Hexadecimal", 7: "Merge Sort", 8: "git clone", 9: "HTTPS" } },
          { studentName: "John Doe", examId: "cs-101", score: 50, responses: { 0: "O(1)", 1: "POST", 2: "Stack", 3: "RAM", 4: "Compilation", 5: "RAM", 6: "Binary", 7: "Bubble Sort", 8: "git clone", 9: "HTTP" } },
          { studentName: "John Doe", examId: "cs-101", score: 90, responses: { 0: "O(log N)", 1: "PUT", 2: "Stack", 3: "ALU", 4: "Compilation", 5: "RAM", 6: "Hexadecimal", 7: "Merge Sort", 8: "git clone", 9: "HTTP" } } // John Doe Second Attempt
        ]
      };
      this.save();
      logger.info("Successfully provisioned high-fidelity relational 60-question production datasets.");
    }
  }

  save() {
    StorageService.set(this.STORAGE_KEY, this.data);
  }

  getTable(tableName) {
    return this.data[tableName];
  }

  insert(tableName, record) {
    this.data[tableName].push(record);
    this.save();
    return record;
  }

  updateExamStatus(examId, newStatus) {
    const exam = this.data.exams.find(e => e.id === examId);
    if (exam) {
      exam.status = newStatus;
      this.save();
      return true;
    }
    return false;
  }
}

export const db = new MockDatabase();