import path from 'path';

const alias = {
  src: path.resolve(process.cwd(), 'src'),
  components: path.resolve(process.cwd(), 'src', 'components'),
};

const pathApp = {
  root: process.cwd(),
  alias
};

export default pathApp;
