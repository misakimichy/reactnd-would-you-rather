import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const LeaderBoard = (props) => {
  const { users } = props;

  return (
    <Styles>
      <h1 className="center">Leader Board</h1>
      <div className="questions">
        {users.map((user) => {
          const { id, avatarURL, name, questions, answers } = user;
          return (
            <div className="question-list" key={id}>
              <img className="avatar" src={avatarURL} alt={`Avatar of ${id}`} />
              <div className="card-right">
                <p className="author">{name}</p>
                <p className="options">Question Asked: {questions.length}</p>
                <p className="options">Question Answered: {Object.keys(answers).length}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Styles>
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

const Styles = styled.section``;
