import {
  Directory, DirectoryMetadata,
} from '../../../../common/types/directory.interface';

export const dummyDirectories: Directory[] = [
  {
    metadata: {
      uuid: 'uuid-0',
      name: 'name-0',
    },
    documents: [
      {
        name: 'invoice',
        url: '/',
        creationDate: new Date().toLocaleDateString(),
        directory: 'uuid-0',
      },
    ],
  },
  {
    metadata: {
      uuid: 'uuid-1',
      name: 'name-1',
    },
    documents: [
      {
        name: 'invoice',
        url: '/',
        creationDate: new Date().toLocaleDateString(),
        directory: 'uuid-1',
      },
    ],
  },
  {
    metadata: {
      uuid: 'uuid-2',
      name: 'name-2',
    },
    documents: [
      {
        name: 'invoice',
        url: '/',
        creationDate: new Date().toLocaleDateString(),
        directory: 'uuid-2',
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
    name: 'name-1',
  },
  {
    uuid: 'uuid-2',
    name: 'name-2',
  },
]
