const TOKEN_KEY = 'auth.token'
const TYPE_KEY = 'auth.type'

export const store = {
  state: {
    user: {
      id: null,
      name: '',
      username: ''
    },
    token: sessionStorage.getItem(TOKEN_KEY) || '',
    type: sessionStorage.getItem(TYPE_KEY) || 'Bearer',
  },

  async setUser(user) {
    this.state.user = user
  },

  async setAuth(data) {
    this.state.user = data.user;
    this.state.token = data.token;
    this.state.type = data.type;

    return this.save()
  },

  async clean() {
    this.state.user = null;
    this.state.token = '';
    this.state.type = 'Bearer'

    return this.save()
  },

  async save() {
    sessionStorage.setItem(TOKEN_KEY, this.state.token)
    sessionStorage.setItem(TYPE_KEY, this.state.type)
  }
}
