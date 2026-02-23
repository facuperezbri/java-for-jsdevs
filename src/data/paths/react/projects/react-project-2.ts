import type { MiniProject } from '../../../../types';

const project: MiniProject = {
  id: 'react-project-2',
  moduleId: 'react-m2',
  title: 'Component Builder',
  description:
    'Build React components from scratch — create functional components with props, conditional rendering, list rendering, and event handling.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'rp2-s1',
      title: 'Write a Functional Component with Props',
      instructions: `Create a functional component called "UserCard" that:
- Accepts props: name (string) and role (string)
- Uses destructuring in the parameter list
- Returns a <div> with an <h2> for the name and a <p> for the role`,
      starterCode: `// Create the UserCard component:
function UserCard() {
  return (
    <div>
      {/* Render name and role here */}
    </div>
  );
}
`,
      validationPattern:
        'function\\s+UserCard\\s*\\(\\s*\\{\\s*name\\s*,\\s*role\\s*\\}\\s*\\).*<h2>.*\\{\\s*name\\s*\\}.*<\\/h2>.*<p>.*\\{\\s*role\\s*\\}.*<\\/p>',
      hints: [
        'Destructure props directly in the parameter: function UserCard({ name, role })',
        'Use curly braces in JSX to embed variables: <h2>{name}</h2>',
      ],
      explanation:
        'Functional components are the standard in modern React. Destructuring props in the parameter list makes it immediately clear which props the component expects and keeps the code clean.',
    },
    {
      id: 'rp2-s2',
      title: 'Add Conditional Rendering',
      instructions: `Update the UserCard component to conditionally render a "Premium" badge:
- Add an "isPremium" boolean prop
- If isPremium is true, render a <span className="badge">Premium</span> after the name
- If isPremium is false, render nothing for the badge`,
      starterCode: `function UserCard({ name, role, isPremium }) {
  return (
    <div>
      <h2>
        {name}
        {/* Add conditional badge here */}
      </h2>
      <p>{role}</p>
    </div>
  );
}
`,
      validationPattern:
        'isPremium\\s*&&\\s*<span|isPremium\\s*\\?\\s*<span',
      hints: [
        'Use the && operator for simple conditionals: {isPremium && <span>...</span>}',
        'Alternatively, use a ternary: {isPremium ? <span>Premium</span> : null}',
      ],
      explanation:
        'Conditional rendering in React uses JavaScript expressions inside JSX. The && pattern is idiomatic for "show or hide" scenarios, while ternaries work when you need an else branch.',
    },
    {
      id: 'rp2-s3',
      title: 'Render a List with Keys',
      instructions: `Create a component called "UserList" that:
- Accepts a "users" prop (an array of objects with id, name, and role)
- Uses .map() to render a <UserCard> for each user
- Passes a unique "key" prop using the user's id
- Passes name and role as props to each UserCard`,
      starterCode: `function UserList({ users }) {
  return (
    <div>
      {/* Map over users and render UserCard components */}
    </div>
  );
}
`,
      validationPattern:
        'users\\.map\\s*\\(.*=>.*<UserCard.*key\\s*=\\s*\\{.*\\.id\\}',
      hints: [
        'Use .map() inside JSX: {users.map(user => <UserCard key={...} ... />)}',
        'The key prop must be unique and stable — use user.id, not the array index',
      ],
      explanation:
        'React uses keys to efficiently update lists. When an item changes, React uses the key to identify which elements need to be added, removed, or reordered — skipping expensive re-renders of unchanged items.',
    },
    {
      id: 'rp2-s4',
      title: 'Add an Event Handler',
      instructions: `Create a component called "LikeButton" that:
- Renders a <button> with the text "Like"
- Defines a handleClick function that calls alert("Liked!")
- Attaches handleClick to the button's onClick event`,
      starterCode: `function LikeButton() {
  // Define the handler:

  return (
    <button>Like</button>
  );
}
`,
      validationPattern:
        '(const|function)\\s+handleClick.*alert\\s*\\(.*Liked.*\\).*onClick\\s*=\\s*\\{\\s*handleClick\\s*\\}',
      hints: [
        'Define the handler inside the component: const handleClick = () => alert("Liked!")',
        'Attach it with JSX syntax: <button onClick={handleClick}>',
      ],
      explanation:
        'React event handlers use camelCase (onClick, not onclick) and receive a synthetic event object. Passing the function reference (handleClick) rather than calling it (handleClick()) ensures it only fires on click.',
    },
  ],
};

export default project;
