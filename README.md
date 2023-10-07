# Portfolio

View the website live [here](https://dtran.tech/)!

## Development

### Getting Started

This project needs to be set up using `yarn`. For some reason, `npm` is incapable of resolving peer dependencies,
so you literally cannot install the packages unless you use `yarn`.

To install `yarn`:

```sh
npm install --global yarn
```

Now, we're ready to get going! First, pull environment variables from Vercel using the following command:

```sh
yarn run pull-env
```

It will install the Vercel package if needed and then save the env variables to a `.env` file in the root folder.

### Running the Server

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
