import React from 'react';
import { connect } from 'react-redux';

const LeaderBoard = (props) => {
  const { users } = props;

  return (
    <section>
      <h1 className="center">Leader Board</h1>
      <ul className="user-list">
        {users.map((user) => {
          const { id, avatarURL, name, questions, answers } = user;
          return (
            <li className="user" key={id}>
              <img className="avatar" src={avatarURL} alt={`Avatar of ${id}`} />
              <span className="user-name">{name}</span>
              <div className="asked">Question Asked: {questions.length}</div>
              <div className="answered">Question Answered: {Object.keys(answers).length}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length)
    ),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
