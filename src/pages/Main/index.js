import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import { setStorage, getStorage, deleteItemStorage } from '../../services/storage';
import { Container, Form } from './styles';
import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  async componentDidMount() {
    await this.asyncStorage();
  }

  asyncStorage = async () => {
    const repositories = await getStorage('repositories');
    if (repositories && repositories.length > 0) {
      this.setState({ repositories });
    }
  };

  itemRemove = async (name, id) => {
    const itens = await deleteItemStorage(name, id);
    if (itens && itens.length > 0) {
      this.setState({ repositories: itens });
    } else {
      this.setState({ repositories: [] });
    }
  };

  asyncWeb = async (respo) => {
    const { repositories } = this.state;
    const { data: repository } = await api.get(`/repos/${respo}`);

    repository.lastCommit = moment(repository.pushed_at).fromNow();

    const filter = repositories.filter(respo => respo.id === repository.id);
    let respos = repositories;

    if (filter.length > 0) {
      respos = repositories.map(respo => (respo.id === repository.id ? repository : respo));
    } else {
      respos.push(repository);
    }

    setStorage('repositories', respos);

    this.setState({
      repositoryInput: '',
      repositories: respos,
      repositoryError: false,
    });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput } = this.state;
      await this.asyncWeb(repositoryInput);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryError, repositoryInput, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          itemRemove={this.itemRemove}
          asyncWeb={this.asyncWeb}
        />
      </Container>
    );
  }
}

export default Main;
