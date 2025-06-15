// import React, { useEffect, useState } from 'react';
// import { NextPage } from 'next';
//
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface FormattingTestProps {
//   name: string;
//   age: number;
// }
//
// const TestFormatting: NextPage = () => {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState('');
//   useEffect(() => {
//     console.log('Effect running');
//   }, [count]);
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (count > 5) {
//       setCount(0);
//     } else {
//       setCount(prev => prev + 1);
//     }
//   };
//
//   const longFunction = (
//     param1: string,
//     param2: number,
//     param3: boolean,
//     param4: string[]
//   ) => {
//     return {
//       data: param1,
//       count: param2,
//       active: param3,
//       items: param4.map(item => item.toUpperCase()),
//       result: param1.length > param2 ? 'long' : 'short',
//     };
//   };
//
//   return (
//     <div
//       style={{ padding: '20px', margin: '10px', backgroundColor: '#f0f0f0' }}
//     >
//       <h1 style={{ color: 'blue', fontSize: '24px' }}>Formatting Test</h1>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="nameInput">Name:</label>
//           <input
//             id="nameInput"
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             style={{ marginLeft: '5px', padding: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Count: {count}</label>
//           <button
//             type="button"
//             onClick={() => setCount(count + 1)}
//             style={{ marginLeft: '10px', padding: '5px 10px' }}
//           >
//             Increment
//           </button>
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: '10px 20px',
//             backgroundColor: 'green',
//             color: 'white',
//             border: 'none',
//           }}
//         >
//           Submit
//         </button>
//       </form>
//       {count > 3 && (
//         <div
//           style={{
//             marginTop: '20px',
//             padding: '10px',
//             border: '1px solid red',
//           }}
//         >
//           <p>Count is greater than 3!</p>
//           <ul>
//             {Array.from({ length: count }).map((_, index) => (
//               <li key={index}>Item {index + 1}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default TestFormatting;
