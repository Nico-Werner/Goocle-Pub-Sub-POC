
# Google PubSub Service POC
A POC implementing the google Pub/Sub service. It is using the PUSH method given by Google Pub/Sub to send a message request that it is then 
pushed to the /listen url to process and sends an email using [Mailtrap](https://mailtrap.io/).

## Requirements
- Install gcloud CLI. Follow [this documentation](https://cloud.google.com/pubsub/docs/publish-receive-messages-client-library)
- After installing gcloud CLI, install [gcloud Pub/Sub](https://cloud.google.com/pubsub/docs/emulator) emulator to test locally.

## Installation

```bash
$ pnpm install
```

## Running the app

- Start the gcloud emulator ```$ gcloud beta emulators pubsub start --project=pubsub-poc-301023```

```bash
# development
$ pnpm run start
```

## License

Nest is [MIT licensed](LICENSE).
