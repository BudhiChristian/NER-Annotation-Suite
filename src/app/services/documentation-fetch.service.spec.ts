import { TestBed } from '@angular/core/testing';

import { DocumentationFetchService } from './documentation-fetch.service';

describe('DocumentationFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentationFetchService = TestBed.get(DocumentationFetchService);
    expect(service).toBeTruthy();
  });
});
