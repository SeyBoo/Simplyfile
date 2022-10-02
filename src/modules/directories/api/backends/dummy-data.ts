import {
  Directory,
  DirectoryMetadata,
} from '../../../../common/types/directory.interface';

export const dummyDirectories: Directory[] = [
  {
    metadata: {
      uuid: 'uuid-0',
      name: 'nom-0',
    },
    documents: [
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-0',
        bookmarked: false,
        uuid: 'doc-0',
      },
    ],
  },
  {
    metadata: {
      uuid: 'uuid-1',
      name: 'cat balls',
    },
    documents: [
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-1',
        bookmarked: false,
        uuid: 'doc-1',
      },
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-1',
        bookmarked: true,
        uuid: 'doc-2',
      },
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-1',
        bookmarked: true,
        uuid: 'doc-3',
      },
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-1',
        bookmarked: true,
        uuid: 'doc-4',
      },
      {
        name: 'invoice',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/chilling%20cat.cce840d13212effdc2dd.jpg',
        creationDate: new Date(),
        directory: 'uuid-1',
        bookmarked: true,
        uuid: 'doc-5',
      },
    ],
  },
  {
    metadata: {
      uuid: 'uuid-2',
      name: 'A beer and a bear',
    },
    documents: [
      {
        name: 'Simon',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/Thirsty_bear.b85014f9b3e50f907bb5.jpg',
        creationDate: new Date(),
        directory: 'uuid-2',
        bookmarked: false,
        uuid: 'doc-0',
      },
      {
        name: 'Igor',
        image:
          'https://click-on-one-of-the-nav-links.netlify.app/static/media/Thirsty_bear.b85014f9b3e50f907bb5.jpg',
        creationDate: new Date(),
        directory: 'uuid-2',
        bookmarked: false,
        uuid: 'doc-1',
      },
    ],
  },
];

export const dummyDirectoriesMetadata: DirectoryMetadata[] = [
  {
    uuid: 'uuid-0',
    name: 'name-0',
  },
  {
    uuid: 'uuid-1',
    name: 'cat balls',
  },
  {
    uuid: 'uuid-2',
    name: 'A beer and a bear',
  },
];
