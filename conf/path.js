import path from 'path';

const alias = {
  src: path.resolve(process.cwd(), 'src'),
  components: path.resolve(process.cwd(), 'src', 'components'),
  containers: path.resolve(process.cwd(), 'src', 'containers'),
  dal: path.resolve(process.cwd(), 'src', 'dal'),
};

const pathApp = {
  root: process.cwd(),
  alias
};

export default pathApp;
