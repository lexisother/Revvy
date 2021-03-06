// <https://github.com/keanuplayz/TravBot-v3/blob/646198c7bc86fa030f691494e688819908ac23be/src/modules/storage.ts>
import fs from 'fs';

const Storage = {
  read(header: string): object {
    this.open('data');
    const path = `data/${header}.json`;
    let data = {};

    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path, 'utf-8');

      try {
        data = JSON.parse(file);
      } catch (error) {
        if (process.argv[2] !== 'dev') {
          console.warn(
            '[storage.read]',
            `Malformed JSON data (header: ${header}), backing it up.`,
            file,
          );
          fs.writeFile(`${path}.backup`, file, (error) => {
            if (error) console.error('[storage.read]', error);
            console.log(
              '[storage.read]',
              `Backup file of "${header}" successfully written as ${file}.`,
            );
          });
        }
      }
    }

    return data;
  },
  // There is no need to log successfully written operations as it pollutes the log with useless info for debugging.
  write(header: string, data: object, asynchronous = true) {
    this.open('data');
    const path = `data/${header}.json`;

    if (IS_DEV_MODE || header === 'config') {
      const result = JSON.stringify(data, null, '\t');

      if (asynchronous)
        fs.writeFile(path, result, (error) => {
          if (error) console.error('[storage.write]', error);
        });
      else fs.writeFileSync(path, result);
    } else {
      const result = JSON.stringify(data);

      if (asynchronous)
        fs.writeFile(path, result, (error) => {
          if (error) console.error('[storage.write]', error);
        });
      else fs.writeFileSync(path, result);
    }
  },
  open(
    path: string,
    filter?: (value: string, index: number, array: string[]) => unknown,
  ): string[] {
    if (!fs.existsSync(path)) fs.mkdirSync(path);

    let directory = fs.readdirSync(path);

    if (filter) directory = directory.filter(filter);

    return directory;
  },
  close(path: string) {
    if (fs.existsSync(path) && fs.readdirSync(path).length === 0)
      fs.rmdir(path, (error) => {
        if (error) console.error('[storage.close]', error);
      });
  },
};

export default Storage;
