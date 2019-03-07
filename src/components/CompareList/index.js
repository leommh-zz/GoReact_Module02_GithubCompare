import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

const CompareList = ({ repositories, itemRemove, asyncWeb }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id + Math.random()}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <button
          className="buttonAsync"
          type="button"
          onClick={() => asyncWeb(`${repository.owner.login}/${repository.name}`)}
        >
          Sincronizar
        </button>

        <ul>
          <li>
            {repository.stargazers_count}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
        <button
          className="buttonRemove"
          type="button"
          onClick={() => itemRemove('repositories', repository.id)}
        >
          Remove
        </button>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.date,
    }),
  ).isRequired,
  itemRemove: PropTypes.func.isRequired,
  asyncWeb: PropTypes.func.isRequired,
};

export default CompareList;
