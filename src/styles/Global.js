import { css } from 'styled-components';

// theme
import { colors } from './theme';

export default css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'sans-serif';
    background-color: ${colors.white};
  }

  h1 {
    font-size: 2.2rem;
    letter-spacing: 1px;
    line-height: 1.25;
    margin-bottom: 15px;
    @media screen and (max-width: 500px) {
      font-size: 1.8rem;
    }
  }

  h2 {
    font-size: 2rem;
    word-spacing: 3px;
    margin-bottom: 15px;
    line-height: 1.2;

    @media screen and (max-width: 500px) {
      font-size: 1.7rem;
    }
  }

  h3 {
    font-size: 1.8rem;
    padding-bottom: 10px;
    line-height: 3rem;

    @media screen and (max-width: 500px) {
      font-size: 1.5rem;
    }
  }

  h4 {
    font-size: 1.6rem;
    padding-bottom: 5px;
    @media screen and (max-width: 500px) {
      font-size: 1.4rem;
    }
  }

  h5 {
    font-size: 1.3rem;
  }

  a,
  li {
    color: inherit;
    text-decoration: none;
  }

  a {
    border-bottom: 2px solid transparent;

    :hover {
      color: ${colors.yellow};
    }

    :focus {
      outline: none;
      border-bottom: 2px solid ${colors.yellow};
    }
  }

  li {
    list-style-type: none;
  }

  button {
    :hover {
      border: 1px solid ${colors.greenHover};
    }

    :focus {
      outline: none;
      background-color: ${colors.greenHover};
    }
  }

  .avatar {
    height: 70px;
    width: 70px;
    margin: 10px 30px 10px 10px;
  }

  .button {
    display: block;
    background-color: ${colors.green};
    border: none;
    border-radius: 3px;
    font-size: 16px;
    color: ${colors.black};
    cursor: pointer;
    width: 150px;
    height: 40px;
    margin: 10px auto;
  }

  .center {
    text-align: center;
  }

  /* Question List */
  .questions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .question-list {
    display: flex;
    align-items: center;

    border: 1px solid ${colors.black};
    border-radius: 3px;

    width: 450px;
    height: 150px;
    margin: 0 auto 16px auto;
    padding: 10px;
  }

  .card-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .author {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .options {
      font-size: 16px;
      text-align: initial;
      margin: 0;
    }
  }

  /* Question result */
  .selected {
    background-color: ${colors.greenHover};
  }

  .result {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 3px;
    padding: 8px 16px;
  }

  /* 
      Media Queries
      Default is more than 1024
      800-1024    - tablet landscape
      800-640     - tablet (Sidebar becomes header)
      640-less    - phone landscape & smaller - one column
  */

  @media screen and (max-width: 800px) {
    .button {
      width: 130px;
    }
  }

  @media screen and (max-width: 500px) {
    .card-right {
      .author {
        font-size: 18px;
      }
    }

    .result {
      padding: 6px 10px;
      .options {
        font-size: 14px;
      }
    }

    .avatar {
      width: 50px;
      height: 50px;
      margin: 10px 20px 10px 10px;
    }

    .question-list {
      width: 300px;
      height: 120px;
    }
  }
`;
