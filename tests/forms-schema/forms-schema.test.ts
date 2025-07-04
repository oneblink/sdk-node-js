import { formSchema, elementSchema } from '../../src/lib/forms-schema'
import { validateWithFormSchema } from '../../src/lib/forms-validation'
import { FormTypes } from '@oneblink/types'

function validateFormThrowError(data: unknown) {
  const result = validateWithFormSchema(data)
  if (!result.success) {
    throw result.error
  }
  return result.data
}

describe('Valid Form Schema with Pages', () => {
  const result = formSchema.validate({
    slug: 'inspec',
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: true,
    submissionEvents: [
      {
        type: 'CALLBACK',
        configuration: {
          url: 'https://domain.io/path',
          organisationManagedSecretId: 1,
        },
      },
    ],
    tags: [],
    elements: [
      {
        id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'page',
        label: 'page1',
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Title',
            label: 'Large Heading',
            type: 'heading',
            required: false,
            headingType: 1,
          },
          {
            id: 'b1a24856-f3a9-4e2e-8ce4-70e92cfe99f0',
            name: 'Location',
            label: 'Where Was It?',
            type: 'location',
            required: false,
          },
          {
            id: 'c3b61176-4332-4731-9643-191e5e204767',
            name: 'signature',
            label: 'Signature',
            type: 'draw',
            required: false,
          },
          {
            id: '4527e000-e5b0-4f4f-9007-7fbfeba7042f',
            name: 'heading',
            label: 'Medium Heading',
            type: 'heading',
            required: false,
            headingType: 3,
          },
          {
            id: '9014e80c-3c68-4adb-a333-1be04ebc95ee',
            name: 'radio',
            label: 'Radio Buttons',
            type: 'radio',
            required: false,
            buttons: false,
            defaultValue: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
            options: [
              {
                id: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
                value: 'ONEvalue',
                label: 'One',
              },
              {
                id: '0729643a-5ffe-416d-8d4b-337e73e96714',
                value: 'twovalue',
                label: 'Two',
              },
              {
                id: 'ada69988-a8b5-4a5e-84be-e998ea27287a',
                value: 'threevalue',
                label: 'Three',
              },
            ],
          },
          {
            id: '01c69734-2543-4cc5-a3ef-d12de468475a',
            name: 'Text_Area',
            label: 'Text Areass',
            type: 'textarea',
            required: false,
            defaultValue: 'Multi line text',
          },
          {
            id: '24de3c4f-3f7a-4296-8d9a-35cfbac7300d',
            name: 'Date',
            label: 'Date',
            type: 'date',
            required: false,
            defaultValue: '2018-08-16T00:00:00.000Z',
          },
          {
            id: 'b30792a6-1074-45fe-b599-2dd76ad3addc',
            name: 'Camer',
            label: 'Camer',
            type: 'camera',
            required: false,
          },
          {
            id: 'dc070d4b-2577-4c49-b682-dafa482b334a',
            name: 'Check_Boxes',
            label: 'Check Boxes',
            type: 'checkboxes',
            required: false,
            buttons: false,
            defaultValue: [
              '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
              '14988191-a741-4a1f-984c-62ca86729808',
            ],
            options: [
              {
                id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                value: 'ONEvalue',
                label: 'One',
              },
              {
                id: '14988191-a741-4a1f-984c-62ca86729808',
                value: 'twovalue',
                label: 'Two',
              },
              {
                id: '869a3234-53c3-4dfe-95af-7b6d449fbc2d',
                value: 'threevalue',
                label: 'Three',
              },
            ],
          },
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Date_and_Time',
            label: 'Date and Time',
            type: 'datetime',
            required: false,
            defaultValue: '2018-08-16T05:28:26.448Z',
          },
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18ba',
            name: 'Numbers_and_more',
            label: 'Numbers and more',
            type: 'number',
            required: false,
            isSlider: false,
            defaultValue: 3,
          },
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers_and_more_slider',
            label: 'Numbers and more (Slider)',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            isSlider: true,
            defaultValue: 3,
          },
          {
            id: '811710b0-bc78-11e8-9131-a774f238a892',
            name: 'checkboxes with attributes',
            label: 'checkboxes with attributes',
            type: 'checkboxes',
            optionsType: 'DYNAMIC',
            dynamicOptionSetId: 1,
            attributesMapping: [
              {
                attribute: 'State',
                elementId: 'fd9c80d5-d56d-4e8d-ab8e-e70c531c77c2',
              },
              {
                attribute: 'Country',
                elementId: 'cc6daf4c-fa10-44e4-8d51-4f56febc9ab0',
              },
            ],
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b27',
            name: 'My_Select',
            label: 'My Select',
            type: 'select',
            required: false,
            multi: false,
            defaultValue: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
            options: [
              {
                id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                value: 'ONE',
                label: 'one',
              },
              {
                id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
                value: 'TWO',
                label: 'two',
              },
              {
                id: '55568d62-6ac5-4504-a88d-e2311a026776',
                value: 'THREE',
                label: 'three',
              },
            ],
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'My_Multi_Select',
            label: 'My Select',
            type: 'select',
            required: false,
            multi: true,
            defaultValue: [
              '9e50b6e5-52b7-48ab-ab86-542ccba82205',
              '5c82ef40-779a-46fb-8860-c9b4969518ec',
            ],
            optionsType: 'CUSTOM',
            conditionallyShowOptions: true,
            conditionallyShowOptionsElementIds: [
              'dc070d4b-2577-4c49-b682-dafa482b334a',
            ],
            options: [
              {
                attributes: [
                  {
                    elementId: 'dc070d4b-2577-4c49-b682-dafa482b334a',
                    optionIds: ['33633fe8-10a8-478b-a24b-49c029c4292c'],
                  },
                  {
                    elementId: 'dc070d4b-2577-4c49-b682-dafa482b334a',
                    optionIds: ['7e7dd403-baad-4a63-8482-8b0f9dc6c4e7'],
                  },
                ],
                id: 'fa0f2864-d812-4610-a6e7-a48666ef5c2f',
                label: '123 Fake Street',
                value: '123 Fake Street',
              },
            ],
          },
          {
            id: '59b723a9-00e2-493f-8d76-84ea71a178ee',
            name: 'Just_Text',
            label: 'Just Text',
            type: 'text',
            required: false,
            defaultValue: 'single line text',
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: true,
            conditionallyShowPredicates: [
              {
                elementId: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                optionIds: ['9e50b6e5-52b7-48ab-ab86-542ccba82205'],
              },
              {
                elementId: '8e4d819b-97fa-438d-b613-a092d38c3b27',
                optionIds: ['5c82ef40-779a-46fb-8860-c9b4969518ec'],
              },
            ],
          },
          {
            id: '67dd8946-89dd-43b6-9b04-aca333a12c29',
            name: 'Test_on_multi_lines',
            label: 'Test on multi lines',
            type: 'textarea',
            required: false,
            defaultValue: 'multi line text',
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb5103',
            name: 'More_Information',
            label: 'More Information',
            type: 'html',
            defaultValue: '<p><b>bold text here<b></p>',
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb9999',
            name: 'calculation',
            label: 'calculations',
            type: 'calculation',
            calculation: '(69*69)+58008',
            defaultValue: '<p><b>{result}<b></p>',
            displayAsCurrency: true,
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7103',
            name: 'Barcode_Scanner',
            label: 'Please Scan Barcode of Box',
            type: 'barcodeScanner',
            required: false,
            defaultValue: '123ABC098ZYX',
          },
          {
            id: 'bb1b3d16-f3e1-4833-a273-19ea18e00582',
            name: 'Samples',
            label: 'Collect samples',
            type: 'repeatableSet',
            minSetEntries: 0,
            maxSetEntries: 5,
            addSetEntryLabel: 'Add an entry',
            removeSetEntryLabel: 'Remove this entry',
            elements: [
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                name: 'What_was_the_time',
                label: 'What was the time',
                type: 'time',
                required: false,
                defaultValue: '1970-01-01T05:28:26.448Z',
              },
            ],
          },
          {
            id: 'a5289278-5cb4-4103-90b6-f67dde84dee7',
            name: 'email',
            label: 'email',
            type: 'email',
            defaultValue: 'developers@oneblink.io',
          },
          {
            id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
            name: 'My_Cat',
            label: 'My Cat',
            type: 'image',
            defaultValue:
              'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
          },
          {
            id: 'b527bcea-dc84-477f-a5ee-d34abfec92fa',
            name: 'files',
            label: 'files',
            type: 'files',
            minEntries: 1,
            maxEntries: 2,
            storageType: 'public',
          },
          {
            id: 'b527bcea-dc84-477f-a5ee-d34abfec92fb',
            name: 'telephone',
            label: 'telephone',
            type: 'telephone',
          },
          {
            id: '042508a4-4a8d-4684-9fd3-640a5018697d',
            name: 'autocomplete',
            label: 'autocomplete',
            type: 'autocomplete',
            options: [
              {
                id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                value: 'ONE',
                label: 'one',
              },
              {
                id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
                value: 'TWO',
                label: 'two',
              },
              {
                id: '55568d62-6ac5-4504-a88d-e2311a026776',
                value: 'THREE',
                label: 'three',
              },
            ],
          },
          {
            id: 'b8a635eb-d28c-4f18-b400-5e2b458e76e9',
            type: 'form',
            name: 'form',
            formId: 1,
          },
          {
            id: '1495d816-e2b5-4b99-b378-fa7cd46e034c',
            type: 'infoPage',
            name: 'infoPage',
            formId: 2,
          },
          {
            id: '042508a4-4a8d-4684-9fd3-640a5018697e',
            name: 'data_lookup_text',
            label: 'Data Lookup text',
            type: 'text',
            isDataLookup: true,
            dataLookupId: 1,
          },
          {
            id: '93624277-22cb-46f2-88f0-035b9837e09d',
            name: 'element_lookup_text',
            label: 'Element Lookup text',
            type: 'text',
            isElementLookup: true,
            elementLookupId: 2,
          },
          {
            id: 'f138d54f-c30f-49d8-9d2c-a8191643a887',
            name: 'both_types_lookup_text',
            label: 'Both Types Lookup text',
            type: 'text',
            isElementLookup: true,
            elementLookupId: 2,
            isDataLookup: true,
            dataLookupId: 1,
          },
          {
            id: '9014e80c-3c68-4adb-a338-1be04ebc9511',
            name: 'My_Lookup_Button',
            label: 'My Lookup Button',
            type: 'lookupButton',
            isDataLookup: true,
            dataLookupId: 1,
            elementDependencies: [
              {
                type: 'FORM_ELEMENT',
                elementId: '0729643a-5ffe-416d-8d4b-337e73e96714',
              },
              {
                type: 'FORM_ELEMENT',
                elementId: '9014e80c-3c68-4adb-a338-1be04ebc95ef',
              },
            ],
          },
        ],
      },
    ],
    enableSubmission: {
      conditionalPredicates: [
        {
          elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18ba',
          type: 'NUMERIC',
          operator: '<',
          value: 5,
        },
      ],
    },
    disableAutosave: true,
  })

  test('should not return an error', () => {
    expect(result.error).toBe(undefined)
  })

  test('should default "readOnly" to "false" for all elements', () => {
    result.value.elements[0].elements.forEach(
      (element: FormTypes.FormElement) => {
        if (
          element.type === 'infoPage' ||
          element.type === 'image' ||
          element.type === 'html' ||
          element.type === 'heading' ||
          element.type === 'lookupButton'
        ) {
          // @ts-expect-error "readyOnly" should be here, hence the check
          expect(element.readOnly).toBeUndefined()
        } else {
          // @ts-expect-error "readyOnly" should be here, hence the check
          expect(element.readOnly).toBe(false)
        }
      },
    )
  })
})

describe('Valid Form Schema', () => {
  const result = formSchema.validate({
    slug: 'inspec',
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    isMultiPage: false,
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [
      {
        type: 'CALLBACK',
        configuration: {
          url: 'https://domain.io/path',
          organisationManagedSecretId: 1,
        },
      },
    ],
    tags: [],
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        name: 'Title',
        label: 'Large Heading',
        type: 'heading',
        required: false,
        headingType: 1,
      },
      {
        id: 'b1a24856-f3a9-4e2e-8ce4-70e92cfe99f0',
        name: 'Location',
        label: 'Where Was It?',
        type: 'location',
        required: false,
      },
      {
        id: 'c3b61176-4332-4731-9643-191e5e204767',
        name: 'signature',
        label: 'Signature',
        type: 'draw',
        required: false,
      },
      {
        id: '4527e000-e5b0-4f4f-9007-7fbfeba7042f',
        name: 'heading',
        label: 'Medium Heading',
        type: 'heading',
        required: false,
        headingType: 3,
      },
      {
        id: '9014e80c-3c68-4adb-a333-1be04ebc95ee',
        name: 'radio',
        label: 'Radio Buttons',
        type: 'radio',
        required: false,
        buttons: false,
        defaultValue: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
        options: [
          {
            id: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
            value: 'ONEvalue',
            label: 'One',
          },
          {
            id: '0729643a-5ffe-416d-8d4b-337e73e96714',
            value: 'twovalue',
            label: 'Two',
          },
          {
            id: 'ada69988-a8b5-4a5e-84be-e998ea27287a',
            value: 'threevalue',
            label: 'Three',
          },
        ],
      },
      {
        id: '01c69734-2543-4cc5-a3ef-d12de468475a',
        name: 'Text_Area',
        label: 'Text Areass',
        type: 'textarea',
        required: false,
        defaultValue: 'Multi line text',
      },
      {
        id: '24de3c4f-3f7a-4296-8d9a-35cfbac7300d',
        name: 'Date',
        label: 'Date',
        type: 'date',
        required: false,
        defaultValue: '2018-08-16T00:00:00.000Z',
      },
      {
        id: 'b30792a6-1074-45fe-b599-2dd76ad3addc',
        name: 'Camer',
        label: 'Camer',
        type: 'camera',
        required: false,
      },
      {
        id: 'dc070d4b-2577-4c49-b682-dafa482b334a',
        name: 'Check_Boxes',
        label: 'Check Boxes',
        type: 'checkboxes',
        required: false,
        buttons: false,
        defaultValue: [
          '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
          '14988191-a741-4a1f-984c-62ca86729808',
        ],
        options: [
          {
            id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
            value: 'ONEvalue',
            label: 'One',
          },
          {
            id: '14988191-a741-4a1f-984c-62ca86729808',
            value: 'twovalue',
            label: 'Two',
          },
          {
            id: '869a3234-53c3-4dfe-95af-7b6d449fbc2d',
            value: 'threevalue',
            label: 'Three',
          },
        ],
      },
      {
        id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
        name: 'Date_and_Time',
        label: 'Date and Time',
        type: 'datetime',
        required: false,
        defaultValue: '2018-08-16T05:28:26.448Z',
      },
      {
        id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18ba',
        name: 'Numbers_and_more',
        label: 'Numbers and more',
        type: 'number',
        required: false,
        minNumber: 1,
        maxNumber: 6,
        defaultValue: 3,
      },
      {
        id: '8e4d819b-97fa-438d-b613-a092d38c3b27',
        name: 'My_Select',
        label: 'My Select',
        type: 'select',
        required: false,
        multi: false,
        defaultValue: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
        options: [
          {
            id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
            value: 'ONE',
            label: 'one',
          },
          {
            id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
            value: 'TWO',
            label: 'two',
          },
          {
            id: '55568d62-6ac5-4504-a88d-e2311a026776',
            value: 'THREE',
            label: 'three',
          },
        ],
      },
      {
        id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
        name: 'My_Multi_Select',
        label: 'My Select',
        type: 'select',
        required: false,
        multi: true,
        defaultValue: [
          '9e50b6e5-52b7-48ab-ab86-542ccba82205',
          '5c82ef40-779a-46fb-8860-c9b4969518ec',
        ],
        options: [
          {
            id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
            value: 'ONE',
            label: 'one',
          },
          {
            id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
            value: 'TWO',
            label: 'two',
          },
          {
            id: '55568d62-6ac5-4504-a88d-e2311a026776',
            value: 'THREE',
            label: 'three',
          },
        ],
      },
      {
        id: '59b723a9-00e2-493f-8d76-84ea71a178ee',
        name: 'Just_Text',
        label: 'Just Text',
        type: 'text',
        required: false,
        defaultValue: 'single line text',
      },
      {
        id: '67dd8946-89dd-43b6-9b04-aca333a12c29',
        name: 'Test_on_multi_lines',
        label: 'Test on multi lines',
        type: 'textarea',
        required: false,
        defaultValue: 'multi line text',
      },
      {
        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
        name: 'What_was_the_time',
        label: 'What was the time',
        type: 'time',
        required: false,
        defaultValue: '1970-01-01T05:28:26.448Z',
      },
      {
        id: 'bb1b3d16-f3e1-4833-a273-19ea18e00582',
        name: 'Samples',
        label: 'Collect samples',
        type: 'repeatableSet',
        minSetEntries: 0,
        maxSetEntries: 5,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
        ],
      },
      {
        id: 'f9efc411-72ff-47ac-874f-8209c0e20f83',
        name: 'A_Captcha',
        label: 'A Captcha',
        type: 'captcha',
      },
      {
        id: '9014e80c-3c68-4adb-a334-1be04ebc95ee',
        name: 'radio_with_dynamic',
        label: 'Radio Buttons',
        type: 'radio',
        required: false,
        buttons: false,
        defaultValue: 'defaultOptionValue',
        optionsType: 'DYNAMIC',
        dynamicOptionSetId: 1,
      },
      {
        id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
        name: 'checkboxes_with_dynamic',
        label: 'Checkboxes',
        type: 'checkboxes',
        required: false,
        buttons: false,
        defaultValue: ['defaultOptionValue'],
        optionsType: 'DYNAMIC',
        dynamicOptionSetId: 1,
      },
      {
        id: '9014e80c-3c68-4adb-a336-1be04ebc95ee',
        name: 'select_with_dynamic',
        label: 'Select',
        type: 'select',
        required: false,
        defaultValue: 'defaultOptionValue',
        optionsType: 'DYNAMIC',
        dynamicOptionSetId: 1,
      },
      {
        id: '9014e80c-3c68-4adb-a337-1be04ebc95ee',
        name: 'multi_select_with_dynamic',
        label: 'Select',
        type: 'select',
        required: false,
        multi: true,
        defaultValue: ['defaultOptionValue'],
        optionsType: 'DYNAMIC',
        dynamicOptionSetId: 1,
      },
      {
        id: '9014e80c-3c68-4adb-a337-1be04ebc95ef',
        name: 'summary',
        label: 'Summary',
        type: 'summary',
        elementIds: ['9014e80c-3c68-4adb-a337-1be04ebc95ee'],
      },
      {
        id: '9014e80c-3c68-4adb-a337-1be04ebc9123',
        name: 'civicaNameRecord',
        label: 'Your Details',
        type: 'civicaNameRecord',
      },
      {
        id: '69b723a9-00e2-493f-8d76-84ea71a178f1',
        name: 'Just_Text_2',
        label: 'Just Text',
        type: 'text',
        required: false,
        defaultValue: 'single line text',
        conditionallyShowPredicates: [
          {
            elementId: '9014e80c-3c68-4adb-a337-1be04ebc95ef',
            type: 'VALUE',
            hasValue: true,
          },
        ],
      },
      {
        id: '9014e80c-3c68-4adb-a338-1be04ebc95ee',
        name: 'compliance',
        label: 'Compliance Checkbox',
        type: 'compliance',
        required: false,
        defaultValue: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
        options: [
          {
            id: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
            value: 'ONEvalue',
            label: 'One',
          },
          {
            id: '0729643a-5ffe-416d-8d4b-337e73e96714',
            value: 'twovalue',
            label: 'Two',
          },
          {
            id: 'ada69988-a8b5-4a5e-84be-e998ea27287a',
            value: 'threevalue',
            label: 'Three',
          },
        ],
      },
      {
        id: '9014e80c-3c68-4adb-a338-1be04ebc95ef',
        name: 'BSB',
        label: 'BSB',
        type: 'bsb',
        required: false,
        defaultValue: '923-100',
      },
      {
        id: '9014e80c-3c68-4adb-a338-1be04ebc9511',
        name: 'My_Lookup_Button',
        label: 'My Lookup Button',
        type: 'lookupButton',
        isDataLookup: true,
        dataLookupId: 1,
        elementDependencies: [
          {
            type: 'FORM_ELEMENT',
            elementId: '0729643a-5ffe-416d-8d4b-337e73e96714',
          },
          {
            type: 'FORM_ELEMENT',
            elementId: '9014e80c-3c68-4adb-a338-1be04ebc95ef',
          },
        ],
      },
    ],
  })

  test('should not return an error', () => {
    expect(result.error).toBe(undefined)
  })

  test('should default "readOnly" to "false" for all elements', () => {
    result.value.elements.forEach((element: FormTypes.FormElement) => {
      if (
        element.type === 'form' ||
        element.type === 'infoPage' ||
        element.type === 'image' ||
        element.type === 'html' ||
        element.type === 'heading' ||
        element.type === 'lookupButton'
      ) {
        // @ts-expect-error "readyOnly" should be here, hence the check
        expect(element.readOnly).toBeUndefined()
      } else {
        // @ts-expect-error "readyOnly" should be here, hence the check
        expect(element.readOnly).toBe(false)
      }
    })
  })
})

test('should set default for radio "buttons" property', () => {
  const { error, value } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          name: 'radio',
          label: 'Radio Buttons',
          type: 'radio',
          required: false,
          options: [
            {
              id: '21ded718-710d-4dca-9f76-ccfc2f855b06',
              value: 'ONEvalue',
              label: 'One',
            },
            {
              id: '3ad5e5a3-52c6-40ed-a0bd-d7a9125f8439',
              value: 'twovalue',
              label: 'Two',
            },
            {
              id: '81ec04d4-367d-44db-8eb0-9f9175fe791c',
              value: 'threevalue',
              label: 'Three',
            },
          ],
        },
      ],
    },
    {
      stripUnknown: true,
    },
  )

  expect(error).toBe(undefined)

  expect(value.elements[0].buttons).toBe(false)
})

test('should error if "buttons" is not a boolean', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          name: 'radio',
          label: 'Radio Buttons',
          type: 'radio',
          required: false,
          buttons: 123,
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: 'ONEvalue',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: 'twovalue',
              label: 'Two',
            },
            {
              id: '18713e3c-e541-4bcf-8b73-f724fdb501c0',
              value: 'threevalue',
              label: 'Three',
            },
          ],
        },
      ],
    },
    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain('"elements[0].buttons" must be a boolean')
})

test('should error if element "id" is not supplied', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
        },
      ],
    },
    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain('"elements[0].id" is required')
})

test('should error if element "id" is not a guid', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '123',
          name: 'text',
          label: 'Text',
          type: 'text',
        },
      ],
    },
    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain('"elements[0].id" must be a valid GUID')
})

test('should error if element "id" is not unique', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          name: 'text',
          label: 'Text',
          type: 'text',
        },
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          name: 'Numbers_and_more',
          label: 'Numbers and more',
          type: 'number',
        },
      ],
    },

    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain('"elements[1]" contains a duplicate value')
})

test('should not error if number min is the same as max', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'test',
          type: 'number',
          label: 'test',
          required: false,
          minNumber: 33.4,
          conditionallyShow: false,
          maxNumber: 33.4,
        },
      ],
    },

    {
      stripUnknown: true,
    },
  )

  expect(error).toBe(undefined)
})

test('should error if number min is greater than max', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'test',
          type: 'number',
          label: 'test',
          required: false,
          minNumber: 33.5,
          conditionallyShow: false,
          maxNumber: 33.4,
        },
      ],
    },

    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain(
    '"elements[0].maxNumber" must be greater than or equal to 33.5',
  )
})

test('should throw error if minNumber is not provided for number element with isSlider as true', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'test',
          type: 'number',
          label: 'test',
          required: false,
          conditionallyShow: false,
          isSlider: true,
          maxNumber: 33.4,
        },
      ],
    },

    {
      stripUnknown: true,
    },
  )

  expect(error?.message).toContain('"elements[0].minNumber" is required')
})

test('should error if number min is not an integer when number isInteger', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'test',
        type: 'number',
        label: 'test',
        required: false,
        minNumber: 33.5,
        conditionallyShow: false,
        isInteger: true,
      },
    ],
  })

  expect(error?.message).toContain('"elements[0].minNumber" must be an integer')
})

test('should error if number max is not an integer when number isInteger', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'test',
        type: 'number',
        label: 'test',
        required: false,
        maxNumber: 33.5,
        conditionallyShow: false,
        isInteger: true,
      },
    ],
  })

  expect(error?.message).toContain('"elements[0].maxNumber" must be an integer')
})

test('should throw error if maxNumber is not provided for number element with isSlider as true', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'test',
        type: 'number',
        label: 'test',
        required: false,
        conditionallyShow: false,
        isSlider: true,
        minNumber: 33.4,
      },
    ],
  })

  expect(error?.message).toContain('"elements[0].maxNumber" is required')
})

test('should error if "toDate" is greater than "fromDate"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'test',
        type: 'date',
        label: 'test',
        fromDate: '2018-08-16T05:28:26.448Z',
        toDate: '2018-08-16T05:27:59.691Z',
      },
    ],
  })

  expect(error?.message).toContain(
    '"elements[0].toDate" must be greater than or equal to "2018-08-16T05:28:26.448Z"',
  )
})

test('should error if "defaultValue" does not match what is valid for each type', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'text',
          type: 'text',
          label: 'test',
          defaultValue: 123,
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'test',
          type: 'textarea',
          label: 'test',
          defaultValue: 123,
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'number',
          type: 'number',
          label: 'test',
          defaultValue: 'abc',
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'date',
          type: 'date',
          label: 'test',
          defaultValue: '123',
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'datetime',
          type: 'datetime',
          label: 'test',
          defaultValue: '123',
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'time',
          type: 'time',
          label: 'test',
          defaultValue: '123',
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'radio',
          type: 'radio',
          label: 'test',
          defaultValue: '123',
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'checkboxes',
          type: 'checkboxes',
          label: 'test',
          defaultValue: 123,
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'checkboxes-two',
          type: 'checkboxes',
          label: 'test',
          defaultValue: ['123'],
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'select',
          type: 'select',
          label: 'test',
          defaultValue: '123',
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'multi-select-one',
          type: 'select',
          label: 'test',
          multi: true,
          defaultValue: 123,
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'multi-select-two',
          type: 'select',
          label: 'test',
          multi: true,
          defaultValue: ['123'],
          options: [
            {
              id: '35049223-dde2-405c-970a-5c2961a85504',
              value: '1',
              label: 'One',
            },
            {
              id: 'bc918f6b-0258-4472-b12d-e5ae05d232b4',
              value: '2',
              label: 'Two',
            },
          ],
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb5103',
          name: 'More_Information',
          label: 'More Information',
          type: 'html',
          defaultValue: 123,
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7103',
          name: 'Barcode_Scanner',
          label: 'Please Scan Barcode of Box',
          type: 'barcodeScanner',
          required: false,
          defaultValue: 123,
        },
      ],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" must be a string',
  )
  expect(error?.details[1].message).toBe(
    '"elements[1].defaultValue" must be a string',
  )
  expect(error?.details[2].message).toBe(
    '"elements[2].defaultValue" must be a number',
  )
  expect(error?.details[3].message).toBe(
    '"elements[3].defaultValue" must be in ISO 8601 date format',
  )
  expect(error?.details[4].message).toBe(
    '"elements[4].defaultValue" must be in ISO 8601 date format',
  )
  expect(error?.details[5].message).toBe(
    '"elements[5].defaultValue" must be in ISO 8601 date format',
  )
  expect(error?.details[6].message).toBe(
    '"elements[6].defaultValue" must be a valid GUID',
  )
  expect(error?.details[7].message).toBe(
    '"elements[7].defaultValue" must be an array',
  )
  expect(error?.details[8].message).toBe(
    '"elements[8].defaultValue[0]" must be a valid GUID',
  )
  expect(error?.details[9].message).toBe(
    '"elements[9].defaultValue" must be a valid GUID',
  )
  expect(error?.details[10].message).toBe(
    '"elements[10].defaultValue" must be an array',
  )
  expect(error?.details[11].message).toBe(
    '"elements[11].defaultValue[0]" must be a valid GUID',
  )
  expect(error?.details[12].message).toBe(
    '"elements[12].defaultValue" must be a string',
  )
  expect(error?.details[13].message).toBe(
    '"elements[13].defaultValue" must be a string',
  )
})

test('should not error if number type element has a "defaultValue" but does not have a "minNumber" or "maxNumber"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'number',
        type: 'number',
        label: 'number',
        defaultValue: 3,
      },
    ],
  })

  expect(error).toBe(undefined)
})

test('should error if number type element has a "defaultValue" less than "minNumber"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'number',
        type: 'number',
        label: 'number',
        defaultValue: 3,
        minNumber: 5,
      },
    ],
  })

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" must be greater than or equal to 5',
  )
})

test('should error if number type element has a "defaultValue" more than "maxNumber"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'number',
        type: 'number',
        label: 'number',
        defaultValue: 3,
        maxNumber: 2,
      },
    ],
  })

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" must be less than or equal to 2',
  )
})

test('should not error if date type element has a "defaultValue" but does not have a "fromDate" or "toDate"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'date',
        type: 'date',
        label: 'date',
        defaultValue: '2018-08-16T00:00:00.000Z',
      },
    ],
  })

  expect(error).toBe(undefined)
})

test('should error if date type element has a "defaultValue" less than "fromDate"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'date',
        type: 'date',
        label: 'date',
        defaultValue: '2018-08-16T00:00:00.000Z',
        fromDate: '2018-08-17T00:00:00.000Z',
      },
    ],
  })

  expect(error?.details[0].message).toContain(
    '"elements[0].defaultValue" must be greater than or equal to',
  )
})

test('should error if date type element has a "defaultValue" more than "toDate"', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'date',
        type: 'date',
        label: 'date',
        defaultValue: '2018-08-16T00:00:00.000Z',
        toDate: '2018-08-15T00:00:00.000Z',
      },
    ],
  })

  expect(error?.details[0].message).toContain(
    '"elements[0].defaultValue" must be less than or equal to',
  )
})

test('should error if repeatableSet type element has no elements', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'repeatableSet',
        type: 'repeatableSet',
        label: 'repeatableSet',
      },
    ],
  })

  expect(error?.details[0].message).toContain(
    '"elements[0].elements" is required',
  )
})

test('should error if repeatableSet type element min entries is more than max entries', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'repeatableSet',
        type: 'repeatableSet',
        label: 'repeatableSet',
        minSetEntries: 2,
        maxSetEntries: -1,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
        ],
      },
    ],
  })

  expect(error?.details[0].message).toContain(
    '"elements[0].maxSetEntries" must be greater than or equal to 2',
  )
})

test('should error if repeatableSet type element min or max entries is less than 0', () => {
  const { error } = formSchema.validate(
    {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'repeatableSet',
          type: 'repeatableSet',
          label: 'repeatableSet',
          minSetEntries: -1,
          maxSetEntries: -1,
          elements: [
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              name: 'What_was_the_time',
              label: 'What was the time',
              type: 'time',
              required: false,
              defaultValue: '1970-01-01T05:28:26.448Z',
            },
          ],
        },
      ],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toContain(
    '"elements[0].minSetEntries" must be greater than or equal to 0',
  )
  expect(error?.details[1].message).toContain(
    '"elements[0].maxSetEntries" must be greater than or equal to 0',
  )
})

test('should error if repeatableSet element names not unique', () => {
  expect(() =>
    validateFormThrowError({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'repeatableSet',
          type: 'repeatableSet',
          label: 'repeatableSet',
          minSetEntries: 1,
          maxSetEntries: 2,
          elements: [
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              name: 'What_was_the_time',
              label: 'What was the time',
              type: 'time',
              required: false,
              defaultValue: '1970-01-01T05:28:26.448Z',
            },
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              name: 'What_was_the_time',
              label: 'What is the time',
              type: 'time',
              required: false,
              defaultValue: '1970-01-01T05:28:26.448Z',
            },
          ],
        },
      ],
    }),
  ).toThrow('"elements[0].elements[1]" contains a duplicate value')
})

test('should error if repeatableSet layout type invalid', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'repeatableSet',
        type: 'repeatableSet',
        label: 'repeatableSet',
        layout: 'INVALID_LAYOUT',
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
        ],
      },
    ],
  })

  expect(error?.details[0].message).toContain(
    '"elements[0].layout" must be one of [SINGLE_ADD_BUTTON, MULTIPLE_ADD_BUTTONS]',
  )
})

test('should succeed if layout SINGLE_ADD_BUTTON', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'repeatableSet',
        type: 'repeatableSet',
        label: 'repeatableSet',
        layout: 'SINGLE_ADD_BUTTON',
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
        ],
      },
    ],
  })

  expect(error).toBeUndefined()
})

test('should succeed if layout MULTIPLE_ADD_BUTTONS', () => {
  const { error } = formSchema.validate({
    name: 'Inspection',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
        name: 'repeatableSet',
        type: 'repeatableSet',
        label: 'repeatableSet',
        layout: 'MULTIPLE_ADD_BUTTONS',
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
            name: 'What_was_the_time',
            label: 'What was the time',
            type: 'time',
            required: false,
            defaultValue: '1970-01-01T05:28:26.448Z',
          },
        ],
      },
    ],
  })

  expect(error).toBeUndefined()
})

describe('summary form elements', () => {
  test('should error if repeatableSet summary element references element that is not valid', () => {
    expect(() =>
      validateFormThrowError({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        tags: [],
        elements: [
          {
            id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
            name: 'repeatableSet',
            type: 'repeatableSet',
            label: 'repeatableSet',
            minSetEntries: 1,
            maxSetEntries: 2,
            elements: [
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700f',
                name: 'heading',
                label: 'Heading',
                type: 'heading',
                headingType: 1,
              },
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                name: 'What_was_the_time',
                label: 'What was the time',
                type: 'time',
                required: false,
                defaultValue: '1970-01-01T05:28:26.448Z',
              },
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
                name: 'time_summary',
                label: 'Time summary',
                type: 'summary',
                elementIds: ['2424f4ea-35a0-47ee-9c22-ef8e16cb700f'],
              },
            ],
          },
        ],
      }),
    ).toThrow(
      '"elements[0].elements[2].elementIds[0]" (2424f4ea-35a0-47ee-9c22-ef8e16cb700f) references a form element type (heading) that cannot be summarised',
    )
  })
  test('should error if repeatableSet summary element references element that is not valid on multi page form', () => {
    expect(() =>
      validateFormThrowError({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        tags: [],
        isMultiPage: true,
        elements: [
          {
            id: '74375ac0-9a0e-11e8-8fc5-63e99eca0ebb',
            type: 'page',
            label: 'page 1',
            elements: [
              {
                id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
                name: 'repeatableSet',
                type: 'repeatableSet',
                label: 'repeatableSet',
                minSetEntries: 1,
                maxSetEntries: 2,
                elements: [
                  {
                    id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700f',
                    name: 'heading',
                    label: 'Heading',
                    type: 'heading',
                    headingType: 1,
                  },
                  {
                    id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                    name: 'What_was_the_time',
                    label: 'What was the time',
                    type: 'time',
                    required: false,
                    defaultValue: '1970-01-01T05:28:26.448Z',
                  },
                  {
                    id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
                    name: 'time_summary',
                    label: 'Time summary',
                    type: 'summary',
                    elementIds: ['2424f4ea-35a0-47ee-9c22-ef8e16cb700f'],
                  },
                ],
              },
            ],
          },
          {
            id: '74375ac0-9a0e-11e8-8fc5-63e99eca0eaa',
            type: 'page',
            label: 'page 2',
            elements: [
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7aaa',
                name: 'heading_page_two',
                label: 'Heading Page 2',
                type: 'heading',
                headingType: 1,
              },
            ],
          },
        ],
      }),
    ).toThrow(
      '"elements[0].elements[0].elements[2].elementIds[0]" (2424f4ea-35a0-47ee-9c22-ef8e16cb700f) references a form element type (heading) that cannot be summarised',
    )
  })
  test('should error if repeatableSet summary element references element that does not exist', () => {
    expect(() =>
      validateFormThrowError({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        tags: [],
        elements: [
          {
            id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
            name: 'repeatableSet',
            type: 'repeatableSet',
            label: 'repeatableSet',
            minSetEntries: 1,
            maxSetEntries: 2,
            elements: [
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                name: 'What_was_the_time',
                label: 'What was the time',
                type: 'time',
                required: false,
                defaultValue: '1970-01-01T05:28:26.448Z',
              },
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
                name: 'time_summary',
                label: 'Time summary',
                type: 'summary',
                elementIds: ['2424f4ea-35a0-47ee-9c22-ef8e16cb700f'],
              },
            ],
          },
        ],
      }),
    ).toThrow(
      '"elements[0].elements[1].elementIds[0]" (2424f4ea-35a0-47ee-9c22-ef8e16cb700f) does not exist in "elements"',
    )
  })

  test('fails when summary elementIds contains a invalidId', () => {
    expect(() =>
      validateFormThrowError({
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            type: 'text',
            name: 'text',
            label: 'text',
          },
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            type: 'summary',
            name: 'summary',
            label: 'text summary',
            elementIds: ['31042cfe-65e0-4a85-826b-ae6a2e48da12'],
          },
        ],
      }),
    ).toThrow(
      '"elements[1].elementIds[0]" (31042cfe-65e0-4a85-826b-ae6a2e48da12) does not exist in "elements"',
    )
  })

  test('fails when summary elementIds contains a invalid type', () => {
    expect(() =>
      validateFormThrowError({
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            type: 'heading',
            name: 'text',
            label: 'text',
            headingType: 1,
          },
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            type: 'summary',
            name: 'summary',
            label: 'text summary',
            elementIds: ['31042cfe-65e0-4a85-826b-ae6a2e48da10'],
          },
        ],
      }),
    ).toThrow(
      '"elements[1].elementIds[0]" (31042cfe-65e0-4a85-826b-ae6a2e48da10) references a form element type (heading) that cannot be summarised',
    )
  })

  test('fails when summary elementIds references self', () => {
    expect(() =>
      validateFormThrowError({
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            type: 'text',
            name: 'text',
            label: 'text',
          },
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            type: 'summary',
            name: 'summary',
            label: 'text summary',
            elementIds: [
              '31042cfe-65e0-4a85-826b-ae6a2e48da10',
              '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            ],
          },
        ],
      }),
    ).toThrow('"elements[1].elementIds" cannot contain a reference to itself')
  })

  test('succeeds when summary elementIds are valid', () => {
    validateFormThrowError({
      formsAppEnvironmentId: 1,
      name: 'Inspection',
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      paymentEvents: [],
      elements: [
        {
          id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
          type: 'text',
          name: 'text',
          label: 'text',
        },
        {
          id: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
          type: 'summary',
          name: 'summary',
          label: 'text summary',
          elementIds: ['31042cfe-65e0-4a85-826b-ae6a2e48da10'],
        },
      ],
    })
  })

  test('succeeds when repeatable set summary elementIds are referencing elements in root elements', () => {
    validateFormThrowError({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'text',
          type: 'text',
          label: 'text',
        },
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'repeatableSet',
          type: 'repeatableSet',
          label: 'repeatableSet',
          minSetEntries: 1,
          maxSetEntries: 2,
          elements: [
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              name: 'What_was_the_time',
              label: 'What was the time',
              type: 'time',
              required: false,
              defaultValue: '1970-01-01T05:28:26.448Z',
            },
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
              name: 'text_and_time_summary',
              label: 'Text and Time summary',
              type: 'summary',
              elementIds: [
                '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
                '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              ],
            },
          ],
        },
      ],
    })
  })

  test('succeeds when repeatable set summary elementIds are referencing elements in root elements on another page', () => {
    validateFormThrowError({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      isMultiPage: true,
      tags: [],
      elements: [
        {
          id: '74375ac0-9a0e-11e8-8fc5-63e99eca0eaa',
          type: 'page',
          label: 'page 1',
          elements: [
            {
              id: '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
              name: 'text',
              type: 'text',
              label: 'text',
            },
          ],
        },
        {
          id: '74375ac0-9a0e-11e8-8fc5-63e99eca0ebb',
          type: 'page',
          label: 'page 2',
          elements: [
            {
              id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
              name: 'repeatableSet',
              type: 'repeatableSet',
              label: 'repeatableSet',
              minSetEntries: 1,
              maxSetEntries: 2,
              elements: [
                {
                  id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                  name: 'What_was_the_time',
                  label: 'What was the time',
                  type: 'time',
                  required: false,
                  defaultValue: '1970-01-01T05:28:26.448Z',
                },
                {
                  id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
                  name: 'text_and_time_summary',
                  label: 'Text and Time summary',
                  type: 'summary',
                  elementIds: [
                    '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
                    '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
  })

  test('succeeds when summary elementIds are referencing elements in a repeatable set in root elements', () => {
    validateFormThrowError({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        {
          id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
          name: 'repeatableSet',
          type: 'repeatableSet',
          label: 'repeatableSet',
          minSetEntries: 1,
          maxSetEntries: 2,
          elements: [
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              name: 'What_was_the_time',
              label: 'What was the time',
              type: 'time',
              required: false,
              defaultValue: '1970-01-01T05:28:26.448Z',
            },
            {
              id: '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
              name: 'text',
              type: 'text',
              label: 'text',
            },
          ],
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
          name: 'text_and_time_summary',
          label: 'Text and Time summary',
          type: 'summary',
          elementIds: [
            '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
            '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
          ],
        },
      ],
    })
  })

  test('succeeds when summary elementIds are referencing elements in a repeatable set on another page', () => {
    validateFormThrowError({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      isMultiPage: true,
      tags: [],
      elements: [
        {
          id: '74375ac0-9a0e-11e8-8fc5-63e99eca0ebb',
          type: 'page',
          label: 'page 1',
          elements: [
            {
              id: '84375ac0-9a0e-11e8-8fc5-63e99eca0edb',
              name: 'repeatableSet',
              type: 'repeatableSet',
              label: 'repeatableSet',
              minSetEntries: 1,
              maxSetEntries: 2,
              elements: [
                {
                  id: '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
                  name: 'text',
                  type: 'text',
                  label: 'text',
                },
                {
                  id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                  name: 'What_was_the_time',
                  label: 'What was the time',
                  type: 'time',
                  required: false,
                  defaultValue: '1970-01-01T05:28:26.448Z',
                },
              ],
            },
          ],
        },
        {
          id: '74375ac0-9a0e-11e8-8fc5-63e99eca0eaa',
          type: 'page',
          label: 'page 2',
          elements: [
            {
              id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
              name: 'text_and_time_summary',
              label: 'Text and Time summary',
              type: 'summary',
              elementIds: [
                '94375ac0-9a0e-11e8-8fc5-63e99eca0edb',
                '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
              ],
            },
          ],
        },
      ],
    })
  })
})

test('should error if page element has child page element', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: true,
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            {
              id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'page',
              label: 'page1',
              elements: [
                {
                  id: 'af9b04c3-f2ad-4994-a525-e7189eb67a79',
                  type: 'text',
                  label: 'Input Label',
                  name: 'Input_Label',
                  required: false,
                },
              ],
            },
          ],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toContain(
    '"elements[0].elements[0].type" must be one of [abn, apiNSWLiquorLicence, arcGISWebMap, autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, files, form, freshdeskDependentField, geoscapeAddress, googleAddress, heading, html, image, infoPage, location, lookupButton, number, pointAddress, pointCadastralParcel, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should error if page element has no elements', () => {
  const { error } = formSchema.validate(
    {
      isMultiPage: true,
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toContain(
    '"elements[0].elements" must contain at least 1 items',
  )
})

test('should error if isMultiPage is set to false', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            {
              id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'page',
              label: 'page1',
              elements: [
                {
                  id: 'af9b04c3-f2ad-4994-a525-e7189eb67a79',
                  type: 'text',
                  label: 'Input Label',
                  name: 'Input_Label',
                  required: false,
                },
              ],
            },
          ],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toContain(
    '"elements[0].type" must be one of [abn, apiNSWLiquorLicence, arcGISWebMap, autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, files, form, freshdeskDependentField, geoscapeAddress, googleAddress, heading, html, image, infoPage, location, lookupButton, number, pointAddress, pointCadastralParcel, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should allow multiple pages', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: true,
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            {
              id: 'af9b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'text',
              label: 'Input Label',
              name: 'Input_Label1',
              required: false,
            },
          ],
        },
        {
          id: '559b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page2',
          elements: [
            {
              id: '569b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'text',
              label: 'Input Label1',
              name: 'Input_Label2',
              required: false,
            },
          ],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error).toBe(undefined)
})

test('should error if root elements arent all page elements', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: true,
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            {
              id: 'af9b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'text',
              label: 'Input Label',
              name: 'Input_Label1',
              required: false,
            },
          ],
        },
        {
          id: '569b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'text',
          label: 'Input Label1',
          name: 'Input_Label2',
          required: false,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe('"elements[1].type" must be [page]')
})

test('should error if isMultiPage is false even if all root elements are pages', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            {
              id: 'af9b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'text',
              label: 'Input Label',
              name: 'Input_Label1',
              required: false,
            },
          ],
        },
        {
          id: '559b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page2',
          elements: [
            {
              id: '569b04c3-f2ad-4994-a525-e7189eb67a79',
              type: 'text',
              label: 'Input Label1',
              name: 'Input_Label2',
              required: false,
            },
          ],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].type" must be one of [abn, apiNSWLiquorLicence, arcGISWebMap, autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, files, form, freshdeskDependentField, geoscapeAddress, googleAddress, heading, html, image, infoPage, location, lookupButton, number, pointAddress, pointCadastralParcel, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should error if image element does not have a default value', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'image',
          name: 'Picture',
          label: 'Picture',
          readOnly: false,
          required: true,
          conditionallyShow: false,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" is required',
  )
})

test('should error if HTML element does not have a default value', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'html',
          label: 'html Input',
          readOnly: false,
          required: true,
          conditionallyShow: false,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe('"elements[0].name" is required')
  expect(error?.details[1].message).toBe(
    '"elements[0].defaultValue" is required',
  )
})

test('should error if calculation element does not have a default value', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'calculation',
          label: 'calculation',
          name: 'calculation',
          readOnly: false,
          required: true,
          conditionallyShow: false,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" is required',
  )
  expect(error?.details[1].message).toBe(
    '"elements[0].calculation" is required',
  )
})

test('should allow array of restricted barcode types', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'barcodeScanner',
          name: 'barcode input',
          label: 'barcode input',
          defaultValue: 'abcdefg',
          readOnly: false,
          required: true,
          conditionallyShow: false,
          restrictBarcodeTypes: true,
          restrictedBarcodeTypes: ['123abc', 'acb123'],
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error).toBe(undefined)
})

test('should require restricted barcode types if restrictBarcodeTypes boolean is true', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'barcodeScanner',
          name: 'barcode input',
          label: 'barcode input',
          defaultValue: 'abcdefg',
          readOnly: false,
          required: true,
          conditionallyShow: false,
          restrictBarcodeTypes: true,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].restrictedBarcodeTypes" is required',
  )
})

test('should throw error if postSubmissionAction is an invalid type', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'NOT_A_VALID_TYPE',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"postSubmissionAction" must be one of [BACK, URL, CLOSE, FORMS_LIBRARY]',
  )
})

test('should throw error if cancelAction is an invalid type', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'BACK',
      cancelAction: 'NOT_A_VALID_TYPE',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"cancelAction" must be one of [BACK, URL, CLOSE, FORMS_LIBRARY]',
  )
})

test('should throw error if postSubmissionAction is missing', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe('"postSubmissionAction" is required')
})

test('should throw error if postSubmissionAction is URL but no URL is present', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'URL',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe('"redirectUrl" is required')
})

test('should throw error if defaultValue for email is not valid', () => {
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'a5289278-5cb4-4103-90b6-f67dde84dee7',
          name: 'email',
          label: 'email',
          type: 'email',
          defaultValue: 'developers',
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    '"elements[0].defaultValue" must be a valid email',
  )
})

test('should throw error if defaultValue contains src="data:', () => {
  const defaultValue =
    '<p>a<img src="https://git.blinkm.co/uploads/-/system/group/avatar/64/1blinkblack.png"><img src="data:image/jpeg;base64,/9j/4AA9k=" alt="Image result"></p>'
  const { error } = formSchema.validate(
    {
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [
        {
          id: 'a5289278-5cb4-4103-90b6-f67dde84dee7',
          name: 'html',
          label: 'html',
          type: 'html',
          defaultValue: defaultValue,
        },
      ],
      isAuthenticated: true,
      submissionEvents: [],
      tags: [],
    },

    {
      abortEarly: false,
    },
  )

  expect(error?.details[0].message).toBe(
    `"elements[0].defaultValue" with value "${defaultValue}" matches the inverted No Binary Data pattern`,
  )
})

describe('optionTypes', () => {
  describe('when freshdesk field', () => {
    test('valid when freshdeskFieldName is provided', () => {
      const result = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'FRESHDESK_FIELD',
            freshdeskFieldName: 'custom_field',
          },
        ],
      })

      expect(result.error).toBe(undefined)
    })
    test('invalid when freshdeskFieldName is NOT provided', () => {
      const { error } = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'FRESHDESK_FIELD',
          },
        ],
      })

      expect(error?.message).toContain(
        '"elements[0].freshdeskFieldName" is required',
      )
    })
  })
  describe('when dynamic', () => {
    test('valid when dynamicOptionSetId is provided', () => {
      const result = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'DYNAMIC',
            dynamicOptionSetId: 1,
          },
        ],
      })

      expect(result.error).toBe(undefined)
    })
    test('invalid when dynamicOptionSetId is NOT provided', () => {
      const { error } = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'DYNAMIC',
          },
        ],
      })

      expect(error?.message).toContain(
        '"elements[0].dynamicOptionSetId" is required',
      )
    })
  })
  describe('when custom', () => {
    test('valid when options are provided', () => {
      const result = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'CUSTOM',
            options: [
              {
                id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                value: 'ONEvalue',
                label: 'One',
              },
            ],
          },
        ],
      })

      expect(result.error).toBe(undefined)
    })
    test('invalid when options are NOT provided', () => {
      const { error } = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            optionsType: 'CUSTOM',
          },
        ],
      })

      expect(error?.message).toContain('"elements[0].options" is required')
    })
  })
  describe('when not provided', () => {
    test('defaults to custom', () => {
      const { error, value } = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: true,
            requiredAll: true,
            options: [
              {
                id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                value: 'ONEvalue',
                label: 'One',
              },
            ],
          },
        ],
      })

      expect(error).toBe(undefined)
      expect(value.elements[0].optionsType).toBe('CUSTOM')
      expect(value.elements[0].requiredAll).toBe(true)
    })
    test('valid when options are provided', () => {
      const result = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
            options: [
              {
                id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                value: 'ONEvalue',
                label: 'One',
              },
            ],
          },
        ],
      })

      expect(result.error).toBe(undefined)
    })
    test('invalid when options are NOT provided', () => {
      const { error } = formSchema.validate({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        isMultiPage: false,
        postSubmissionAction: 'FORMS_LIBRARY',
        tags: [],
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            name: 'Czech boxes',
            label: 'Czechboxes',
            type: 'checkboxes',
            required: false,
          },
        ],
      })

      expect(error?.message).toContain('"elements[0].options" is required')
    })
  })
})

describe('Freshdesk Submission Event', () => {
  test('should allow Freshdesk Create Ticket submission event', () => {
    const submissionEvents = [
      {
        type: 'FRESHDESK_CREATE_TICKET',
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {
          mapping: [
            {
              freshdeskFieldName: 'customNameNested',
              type: 'FORM_FORM_ELEMENT',
              formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
              mapping: {
                freshdeskFieldName: 'customNameNested',
                type: 'FORM_FORM_ELEMENT',
                formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a90',
                mapping: {
                  freshdeskFieldName: 'customNameNested',
                  type: 'FORM_ELEMENT',
                  formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a90',
                },
              },
            },
            {
              freshdeskFieldName: 'customName',
              type: 'FORM_ELEMENT',
              formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
            {
              freshdeskFieldName: 'customNameTwo',
              type: 'VALUE',
              value: true,
            },
            {
              freshdeskFieldName: 'customNameThree',
              type: 'SUBMISSION_ID',
            },
            {
              freshdeskFieldName: 'customNameFour',
              type: 'EXTERNAL_ID',
            },
          ],
        },
      },
    ]
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'form',
            name: 'nested',
            formId: 1,
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents,
      },

      {
        abortEarly: false,
        stripUnknown: true,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents).toEqual(submissionEvents)
  })
  test('should not allow Freshdesk Create Ticket submission event with wrong formElementId', () => {
    const run = () =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'FRESHDESK_CREATE_TICKET',
            configuration: {
              mapping: [
                {
                  freshdeskFieldName: 'someName',
                  type: 'FORM_ELEMENT',
                  formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a80',
                },
              ],
            },
          },
        ],
      })
    expect(run).toThrow(
      '"submissionEvents[0].configuration.mapping[0].formElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a80) does not exist in "elements".',
    )
  })
})

describe('Freshdesk add note Submission Event', () => {
  test('should allow Freshdesk Add Note To Ticket submission event', () => {
    const submissionEvents = [
      {
        type: 'FRESHDESK_ADD_NOTE_TO_TICKET',
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {},
      },
    ]
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents,
      },

      {
        abortEarly: false,
        stripUnknown: true,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents).toEqual(submissionEvents)
  })
})

describe('PDF submission event', () => {
  test('should allow Email submission event', () => {
    const submissionEvents = [
      {
        type: 'EMAIL',
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {
          email: 'developers@oneblink.io',
          emailTemplate: {
            id: 1,
            mapping: [
              {
                mustacheTag: 'custom:firstName',
                type: 'FORM_ELEMENT',
                formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
              },
              {
                mustacheTag: 'custom:text',
                type: 'TEXT',
                text: 'This is the text',
              },
            ],
          },
          emailAttachmentsEndpoint: {
            type: 'ONEBLINK_API',
            configuration: {
              apiId: 'customer-project.api.oneblink.io',
              apiEnvironment: 'dev',
              apiEnvironmentRoute: '/attachments',
              organisationManagedSecretId: 1,
            },
          },
          excludedAttachmentElementIds: [],
        },
      },
    ]
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents,
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents).toEqual(submissionEvents)
  })
  test('should allow PDF submission event with email address', () => {
    const submissionEvents = [
      {
        type: 'PDF',
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {
          email: 'developers@oneblink.io',
          excludedElementIds: [],
          excludedAttachmentElementIds: [],
          excludedCSSClasses: [],
          emailTemplate: {
            id: 1,
            mapping: [
              {
                mustacheTag: 'custom:firstName',
                type: 'FORM_ELEMENT',
                formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
              },
              {
                mustacheTag: 'custom:text',
                type: 'TEXT',
                text: 'This is the text',
              },
            ],
          },
          emailAttachmentsEndpoint: {
            type: 'CALLBACK',
            configuration: {
              url: 'https://customer-project-dev.api.oneblink.io/attachments',
              organisationManagedSecretId: 1,
            },
          },
        },
      },
    ]
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents,
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents).toEqual(submissionEvents)
  })
  test('should allow PDF submission event with field value', () => {
    const result = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,

        tags: [],
        submissionEvents: [
          {
            type: 'PDF',
            configuration: {
              email: '{ELEMENT:abc}',
            },
          },
          {
            type: 'PDF',
            configuration: {
              email: '{USER:email}',
            },
          },
          {
            type: 'PDF',
            configuration: {
              email: '{ELEMENT_VALUE:abc}',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
  })
  test('should disallow PDF submission event with email that is not a email address or a field:', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,

        tags: [],
        submissionEvents: [
          {
            type: 'PDF',
            configuration: {
              email: 'sdfsdfsd',
              ccEmail: ['{USER:name}'],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.details.length).toBe(2)
    expect(error?.details[0].message).toBe(
      '"submissionEvents[0].configuration.email" does not match any of the allowed types',
    )
    expect(error?.details[1].message).toBe(
      '"submissionEvents[0].configuration.ccEmail[0]" does not match any of the allowed types',
    )
  })
  test('should disallow PDF submission event with email template mapping referencing element that does not exist', () => {
    const run = () =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'text',
            name: 'firstName',
            label: 'First Name',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'PDF',
            configuration: {
              email: 'developers@oneblink.io',
              emailTemplate: {
                id: 1,
                mapping: [
                  {
                    mustacheTag: 'custom:firstName',
                    type: 'FORM_ELEMENT',
                    formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
                  },
                ],
              },
            },
          },
        ],
      })
    expect(run).toThrow(
      '"submissionEvents[0].configuration.mapping[0].formElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a79) does not exist in "elements".',
    )
  })
})

describe('CALLBACK submission event', () => {
  test('should allow CALLBACK submission event with url and secrent', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,

        tags: [],
        submissionEvents: [
          {
            type: 'CALLBACK',
            isRetryable: true,
            configuration: {
              url: 'https://google.com',
              organisationManagedSecretId: 1,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })
  test('should disallow CALLBACK submission event without url and secrent', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,

        tags: [],
        submissionEvents: [
          {
            type: 'CALLBACK',
            configuration: {},
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.details[0].message).toBe(
      `"submissionEvents[0].configuration.url" is required`,
    )
  })
})
describe('TRIM submission event', () => {
  test('should allow TRIM submission event', () => {
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'TRIM',
            isRetryable: true,
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              container: {
                uri: 4,
                label: 'URI Label',
              },
              recordType: {
                uri: 1,
                label: 'Record Type Label',
              },
              actionDefinition: {
                uri: 2,
                label: 'Action Definition Label',
              },
              location: {
                uri: 3,
                label: 'Location Label',
              },
              groupFiles: true,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents[0].configuration.groupFiles).toBe(true)
    expect(value.submissionEvents[0].isRetryable).toBe(true)
  })
  test('should error TRIM submission event not passing environmentId', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'TRIM',
            configuration: {
              container: {
                uri: 4,
                label: 'URI Label',
              },
              recordType: {
                uri: 1,
                label: 'Record Type Label',
              },
              actionDefinition: {
                uri: 2,
                label: 'Action Definition Label',
              },
              location: {
                uri: 3,
                label: 'Location Label',
              },
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.environmentId" is required',
    )
  })

  test('should allow TRIM submission event without location or action', () => {
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'TRIM',
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              container: {
                uri: 4,
                label: 'URI Label',
              },
              recordType: {
                uri: 1,
                label: 'Record Type Label',
              },
              groupFiles: true,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents[0].configuration.groupFiles).toBe(true)
  })

  test('should allow TRIM submission event without location', () => {
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'TRIM',
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              container: {
                uri: 4,
                label: 'URI Label',
              },
              actionDefinition: {
                uri: 2,
                label: 'Action Definition Label',
              },
              recordType: {
                uri: 1,
                label: 'Record Type Label',
              },
              groupFiles: true,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents[0].configuration.groupFiles).toBe(true)
  })

  test('should allow TRIM submission event without action', () => {
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'TRIM',
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              container: {
                uri: 4,
                label: 'URI Label',
              },
              location: {
                uri: 3,
                label: 'Location Label',
              },
              recordType: {
                uri: 1,
                label: 'Record Type Label',
              },
              groupFiles: true,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(value.submissionEvents[0].configuration.groupFiles).toBe(true)
  })
})

describe('SCHEDULING submission event', () => {
  test('should allow SCHEDULING form event', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'text',
            label: 'text',
          },
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
            type: 'email',
            name: 'email',
            label: 'email',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [],
        schedulingEvents: [
          {
            type: 'NYLAS',
            configuration: {
              nylasGrantId: 'string',
              nylasConfigurationId: 'one',
              nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
              emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
            },
          },
        ],
      },
      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })
  test('should error SCHEDULING submission event if nameElementId does not exist', () => {
    expect(() =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        schedulingEvents: [
          {
            type: 'NYLAS',
            configuration: {
              nylasGrantId: 'string',
              nylasConfigurationId: 'one',
              nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"schedulingEvents[0].configuration.nameElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements"',
    )
  })
  test('should error SCHEDULING submission event if "nameElementId" references an element that is a "text" element', () => {
    expect(() =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'number',
            name: 'number',
            label: 'number',
          },
        ],
        isAuthenticated: true,
        tags: [],
        schedulingEvents: [
          {
            type: 'NYLAS',
            configuration: {
              nylasGrantId: 'string',
              nylasConfigurationId: 'one',
              nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"schedulingEvents[0].configuration.nameElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) references a form element that is not a "text" element.',
    )
  })
  test('should error SCHEDULING submission event if emailElementId does not exist', () => {
    expect(() =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [],
        isAuthenticated: true,
        tags: [],
        schedulingEvents: [
          {
            type: 'NYLAS',
            configuration: {
              nylasGrantId: 'string',
              nylasConfigurationId: 'one',
              emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"schedulingEvents[0].configuration.emailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements"',
    )
  })
  test('should error SCHEDULING submission event if "emailElementId" references an element that isn\'t an "email" element', () => {
    expect(() =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            type: 'number',
            name: 'number',
            label: 'number',
          },
        ],
        isAuthenticated: true,
        tags: [],
        schedulingEvents: [
          {
            type: 'NYLAS',
            configuration: {
              nylasGrantId: 'string',
              nylasConfigurationId: 'one',
              emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"schedulingEvents[0].configuration.emailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) references a form element that is not an "email" element.',
    )
  })
})
describe('CIVICA_CRM submission event', () => {
  test('should allow CIVICA_CRM submission event', () => {
    const { error, value } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'text',
            label: 'text',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'CIVICA_CRM',
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              civicaCustomerContactMethod: {
                code: 'code',
                description: 'description',
              },
              civicaCategory: {
                id: 1,
                label: 'category',
              },
              mapping: [
                {
                  civicaCategoryItemNumber: 1,
                  formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
                },
              ],
            },
          },
        ],
      },
      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
    expect(
      value.submissionEvents[0].configuration.mapping[0].isDescription,
    ).toBe(false)
  })
  test('should error CIVICA_CRM submission event not passing environmentId', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'text',
            label: 'text',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'CIVICA_CRM',
            configuration: {},
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.environmentId" is required',
    )
  })
  test('should error CIVICA_CRM submission event if mapping contains a formElementId that does not exist', () => {
    expect(() =>
      validateFormThrowError({
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'text',
            label: 'text',
          },
        ],
        isAuthenticated: true,
        tags: [],
        submissionEvents: [
          {
            type: 'CIVICA_CRM',
            configuration: {
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              civicaCustomerContactMethod: {
                code: 'code',
                description: 'description',
              },
              civicaCategory: {
                id: 1,
                label: 'category',
              },
              mapping: [
                {
                  civicaCategoryItemNumber: 1,
                  formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
                },
              ],
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.mapping[0].formElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements"',
    )
  })
})

describe('BPOINT submission event', () => {
  test('should error for BPOINT submission event not passing "elementId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,

      tags: [],
      paymentEvents: [
        {
          type: 'BPOINT',
          configuration: {},
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.elementId" is required',
    )
  })
  test('should error for BPOINT submission event not passing "environmentId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,

      tags: [],
      paymentEvents: [
        {
          type: 'BPOINT',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.environmentId" is required',
    )
  })
  test('should allow BPOINT submission event', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,

        paymentEvents: [
          {
            type: 'BPOINT',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })
})

describe('WESTPAC_QUICK_STREAM submission event', () => {
  test('should error for WESTPAC_QUICK_STREAM submission event not passing "elementId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      tags: [],
      paymentEvents: [
        {
          type: 'WESTPAC_QUICK_STREAM',
          configuration: {},
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.elementId" is required',
    )
  })
  test('should error for WESTPAC_QUICK_STREAM submission event not passing "environmentId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,
      tags: [],
      paymentEvents: [
        {
          type: 'WESTPAC_QUICK_STREAM',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.environmentId" is required',
    )
  })
  test('should allow WESTPAC_QUICK_STREAM submission event', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,
        paymentEvents: [
          {
            type: 'WESTPAC_QUICK_STREAM',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              customerReferenceNumber: 'abc',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })
})

describe('CP_PAY submission event', () => {
  test('should allow CP_PAY submission event', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,

        paymentEvents: [
          {
            type: 'CP_PAY',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              gatewayId: '056f58b6-95bd-4df3-b6b4-f5bcc5e5ae8e',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })
})

describe('NSW_GOV_PAY submission event', () => {
  test('should error for NSW_GOV_PAY submission event not passing "elementId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,

      tags: [],
      paymentEvents: [
        {
          type: 'NSW_GOV_PAY',
          configuration: {},
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.elementId" is required',
    )
  })
  test('should error for NSW_GOV_PAY submission event not passing "primaryAgencyId"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,

      tags: [],
      paymentEvents: [
        {
          type: 'NSW_GOV_PAY',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.primaryAgencyId" is required',
    )
  })
  test('should error for NSW_GOV_PAY submission event not passing "productDescription"', () => {
    const { error } = formSchema.validate({
      name: 'string',
      description: 'string',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: 'ORGANISATION_00000000001',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      elements: [],
      isAuthenticated: true,

      tags: [],
      paymentEvents: [
        {
          type: 'NSW_GOV_PAY',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            primaryAgencyId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.productDescription" is required',
    )
  })
  test('should allow NSW_GOV_PAY submission event', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,

        paymentEvents: [
          {
            type: 'NSW_GOV_PAY',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              primaryAgencyId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              productDescription: 'This is the description',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })

  test('should not allow NSW_GOV_PAY submission event with a "customerReference" of character length over 250', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,

        paymentEvents: [
          {
            type: 'NSW_GOV_PAY',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              primaryAgencyId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              productDescription: 'This is the description',
              customerReference:
                'dkjfshfhdsaklhfdskhafldskhfdskhjfdskhjfl20934h723h5t8734th48743hwg54wby5nb4v3987t5437829n42897t23vfc54nv9g7w9n578245h432iu5h32fn39n9739nb9n75b99898rf32tg58f5fh08gfh348uvt8bnh38qhrefhgysdgfjdshy90283hr14ytgu4yt43thyu344yu34w5fbqnv84vt4v23t4vg3b542bv25123',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.customerReference" length must be less than or equal to 250 characters long',
    )
  })

  test('should not allow NSW_GOV_PAY submission event with a "productDescription" of character length over 250', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
          },
        ],
        isAuthenticated: true,

        paymentEvents: [
          {
            type: 'NSW_GOV_PAY',
            configuration: {
              elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              primaryAgencyId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              productDescription:
                'dkjfshfhdsaklhfdskhafldskhfdskhjfdskhjfl20934h723h5t8734th48743hwg54wby5nb4v3987t5437829n42897t23vfc54nv9g7w9n578245h432iu5h32fn39n9739nb9n75b99898rf32tg58f5fh08gfh348uvt8bnh38qhrefhgysdgfjdshy90283hr14ytgu4yt43thyu344yu34w5fbqnv84vt4v23t4vg3b542bv25123',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"paymentEvents[0].configuration.productDescription" length must be less than or equal to 250 characters long',
    )
  })
})

describe('CP_HCMS submission event', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    tags: [],
    elements: [
      {
        id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
        name: 'Numbers',
        label: 'Numbers',
        type: 'number',
        required: false,
      },
    ],
    isAuthenticated: true,
  }
  test('should allow CP_HCMS submission event', () => {
    const input = {
      ...form,
      elements: [
        ...form.elements,
        {
          id: 'f75ae5bf-e729-4816-b040-f67ddfe54824',
          name: 'notification',
          label: 'Notification',
          type: 'boolean',
          displayAsCheckbox: true,
        },
      ],
      submissionEvents: [
        {
          type: 'CP_HCMS',
          configuration: {
            contentTypeName: 'contenttypename-1',
            encryptedElementIds: ['b941ea2d-965c-4d40-8c1d-e5a231fc18b1'],
            tags: ['my-tag', 'your-tag'],
            categories: [
              {
                id: 'c028c583-6c58-4d8f-8ff8-c9fbc870069e',
                name: 'Animals',
              },
              {
                id: '7117543b-faf3-476c-8d10-ef45757485d1',
                name: 'Old Stuff',
              },
            ],
            notificationElementId: 'f75ae5bf-e729-4816-b040-f67ddfe54824',
          },
        },
      ],
    }
    const { error, value } = formSchema.validate(input, {
      abortEarly: false,
    })
    expect(error).toBe(undefined)
    expect(
      input.submissionEvents.map((s) => ({
        ...s,
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {
          ...s.configuration,
          excludedCSSClasses: [],
          excludedElementIds: [],
          encryptPdf: false,
        },
      })),
    ).toEqual(value.submissionEvents)
  })
  test('should reject CP_HCMS submission event with contentType name > 40', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName:
                'contenttypename-1asasasasasasasasasasasasaasasasasa',
            },
          },
        ],
      },
      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.contentTypeName" length must be less than or equal to 40 characters long',
    )
  })
  test('should reject CP_HCMS submission event with contentType name uppercase', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'YELLINGNAME',
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain('fails to match the required pattern')
  })
  test('should reject CP_HCMS submission event with duplicate encryptedElementIds', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              encryptedElementIds: [
                'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
              ],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.encryptedElementIds[1]" contains a duplicate value',
    )
  })
  test('should reject CP_HCMS submission event with duplicate tags', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              tags: ['duplicate', 'duplicate'],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.tags[1]" contains a duplicate value',
    )
  })
  test('should reject CP_HCMS submission event with duplicate categories', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              categories: [
                {
                  id: 'c028c583-6c58-4d8f-8ff8-c9fbc870069e',
                  name: 'Animals',
                },
                {
                  id: 'c028c583-6c58-4d8f-8ff8-c9fbc870069e',
                  name: 'Animals Duplicate',
                },
              ],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.categories[1]" contains a duplicate value',
    )
  })
  test('should reject CP_HCMS submission event with empty tags', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              tags: [],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.tags" must contain at least 1 items',
    )
  })
  test('should reject CP_HCMS submission event with empty categories', () => {
    const { error } = formSchema.validate(
      {
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              categories: [],
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.categories" must contain at least 1 items',
    )
  })
  test('should reject CP_HCMS submission event with bad notification element reference - non-existant', () => {
    const validation = () =>
      validateFormThrowError({
        ...form,
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              notificationElementId: 'f75ae5bf-e729-4816-b040-f67ddfe54824',
            },
          },
        ],
      })
    expect(validation).toThrow(
      'You tried to reference an element f75ae5bf-e729-4816-b040-f67ddfe54824 that does not exist on the form, in a CP_HCMS form event.',
    )
  })
  test('should reject CP_HCMS submission event with bad notification element reference - wrong type', () => {
    const validation = () =>
      validateFormThrowError({
        ...form,
        elements: [
          ...form.elements,
          {
            id: 'f75ae5bf-e729-4816-b040-f67ddfe54824',
            name: 'notification',
            label: 'Notification',
            type: 'text',
          },
        ],
        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              notificationElementId: 'f75ae5bf-e729-4816-b040-f67ddfe54824',
            },
          },
        ],
      })
    expect(validation).toThrow('Notification element is not a boolean element')
  })
})

describe('Data Lookup enabled', () => {
  test('should allow id for data lookup enabled type', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'data lookup enabled',
            label: 'data lookup enabled',
            defaultValue: 'abcdefg',
            readOnly: false,
            required: true,
            conditionallyShow: false,
            isDataLookup: true,
            dataLookupId: 1,
          },
        ],
        isAuthenticated: true,

        submissionEvents: [],
        tags: [],
      },

      {
        abortEarly: false,
      },
    )

    expect(error).toBe(undefined)
  })

  test('should require id if data lookup boolean is true', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'data lookup enabled',
            label: 'data lookup enabled',
            defaultValue: 'abcdefg',
            readOnly: false,
            required: true,
            conditionallyShow: false,
            isDataLookup: true,
          },
        ],
        isAuthenticated: true,

        submissionEvents: [],
        tags: [],
      },

      {
        abortEarly: false,
      },
    )

    expect(error?.details[0].message).toBe(
      '"elements[0].dataLookupId" is required',
    )
  })

  test('should require id if element lookup boolean is true', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
            type: 'text',
            name: 'element lookup enabled',
            label: 'element lookup enabled',
            defaultValue: 'abcdefg',
            readOnly: false,
            required: true,
            conditionallyShow: false,
            isElementLookup: true,
          },
        ],
        isAuthenticated: true,

        submissionEvents: [],
        tags: [],
      },

      {
        abortEarly: false,
      },
    )

    expect(error?.details[0].message).toBe(
      '"elements[0].elementLookupId" is required',
    )
  })
})

describe('invalid property removal', () => {
  const createForm = (props: Record<string, unknown>) => {
    return {
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: true,
      submissionEvents: [
        {
          type: 'CALLBACK',
          configuration: {
            url: 'https://domain.io/path',
            organisationManagedSecretId: 1,
          },
        },
      ],
      elements: [
        {
          id: '119b04c3-f2ad-4994-a525-e7189eb67a79',
          type: 'page',
          label: 'page1',
          elements: [
            Object.assign(
              {},
              {
                id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
                name: 'Title',
                label: 'Large Heading',
                type: 'heading',
                required: false,
                headingType: 1,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b1a24856-f3a9-4e2e-8ce4-70e92cfe99f0',
                name: 'Location',
                label: 'Where Was It?',
                type: 'location',
                required: false,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'c3b61176-4332-4731-9643-191e5e204767',
                name: 'signature',
                label: 'Signature',
                type: 'draw',
                required: false,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '4527e000-e5b0-4f4f-9007-7fbfeba7042f',
                name: 'heading',
                label: 'Medium Heading',
                type: 'heading',
                required: false,
                headingType: 3,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '9014e80c-3c68-4adb-a333-1be04ebc95ee',
                name: 'radio',
                label: 'Radio Buttons',
                type: 'radio',
                required: false,
                buttons: false,
                defaultValue: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
                options: [
                  {
                    id: '8be1f1dd-ec3f-4537-bb70-f0f1c7c31b26',
                    value: 'ONEvalue',
                    label: 'One',
                  },
                  {
                    id: '0729643a-5ffe-416d-8d4b-337e73e96714',
                    value: 'twovalue',
                    label: 'Two',
                  },
                  {
                    id: 'ada69988-a8b5-4a5e-84be-e998ea27287a',
                    value: 'threevalue',
                    label: 'Three',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '01c69734-2543-4cc5-a3ef-d12de468475a',
                name: 'Text_Area',
                label: 'Text Areass',
                type: 'textarea',
                required: false,
                defaultValue: 'Multi line text',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '24de3c4f-3f7a-4296-8d9a-35cfbac7300d',
                name: 'Date',
                label: 'Date',
                type: 'date',
                required: false,
                defaultValue: '2018-08-16T00:00:00.000Z',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b30792a6-1074-45fe-b599-2dd76ad3addc',
                name: 'Camer',
                label: 'Camer',
                type: 'camera',
                required: false,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'dc070d4b-2577-4c49-b682-dafa482b334a',
                name: 'Check_Boxes',
                label: 'Check Boxes',
                type: 'checkboxes',
                required: false,
                buttons: false,
                defaultValue: [
                  '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                  '14988191-a741-4a1f-984c-62ca86729808',
                ],
                options: [
                  {
                    id: '25ec5754-0d9a-4783-82d4-fd6ecce35d2f',
                    value: 'ONEvalue',
                    label: 'One',
                  },
                  {
                    id: '14988191-a741-4a1f-984c-62ca86729808',
                    value: 'twovalue',
                    label: 'Two',
                  },
                  {
                    id: '869a3234-53c3-4dfe-95af-7b6d449fbc2d',
                    value: 'threevalue',
                    label: 'Three',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
                name: 'Date_and_Time',
                label: 'Date and Time',
                type: 'datetime',
                required: false,
                defaultValue: '2018-08-16T05:28:26.448Z',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18ba',
                name: 'Numbers_and_more',
                label: 'Numbers and more',
                type: 'number',
                required: false,
                isSlider: false,
                defaultValue: 3,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                name: 'Numbers_and_more_slider',
                label: 'Numbers and more (Slider)',
                type: 'number',
                required: false,
                minNumber: 1,
                maxNumber: 6,
                isSlider: true,
                defaultValue: 3,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '811710b0-bc78-11e8-9131-a774f238a892',
                name: 'checkboxes with attributes',
                label: 'checkboxes with attributes',
                type: 'checkboxes',
                optionsType: 'DYNAMIC',
                dynamicOptionSetId: 1,
                attributesMapping: [
                  {
                    attribute: 'State',
                    elementId: 'fd9c80d5-d56d-4e8d-ab8e-e70c531c77c2',
                  },
                  {
                    attribute: 'Country',
                    elementId: 'cc6daf4c-fa10-44e4-8d51-4f56febc9ab0',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '8e4d819b-97fa-438d-b613-a092d38c3b27',
                name: 'My_Select',
                label: 'My Select',
                type: 'select',
                required: false,
                multi: false,
                defaultValue: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                options: [
                  {
                    id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                    value: 'ONE',
                    label: 'one',
                  },
                  {
                    id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
                    value: 'TWO',
                    label: 'two',
                  },
                  {
                    id: '55568d62-6ac5-4504-a88d-e2311a026776',
                    value: 'THREE',
                    label: 'three',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                name: 'My_Multi_Select',
                label: 'My Select',
                type: 'select',
                required: false,
                multi: true,
                defaultValue: [
                  '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                  '5c82ef40-779a-46fb-8860-c9b4969518ec',
                ],
                optionsType: 'CUSTOM',
                conditionallyShowOptions: true,
                conditionallyShowOptionsElementIds: [
                  'dc070d4b-2577-4c49-b682-dafa482b334a',
                ],
                options: [
                  {
                    attributes: [
                      {
                        elementId: 'dc070d4b-2577-4c49-b682-dafa482b334a',
                        optionIds: ['33633fe8-10a8-478b-a24b-49c029c4292c'],
                      },
                      {
                        elementId: 'dc070d4b-2577-4c49-b682-dafa482b334a',
                        optionIds: ['7e7dd403-baad-4a63-8482-8b0f9dc6c4e7'],
                      },
                    ],
                    id: 'fa0f2864-d812-4610-a6e7-a48666ef5c2f',
                    label: '123 Fake Street',
                    value: '123 Fake Street',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '59b723a9-00e2-493f-8d76-84ea71a178ee',
                name: 'Just_Text',
                label: 'Just Text',
                type: 'text',
                required: false,
                defaultValue: 'single line text',
                conditionallyShow: true,
                requiresAllConditionallyShowPredicates: true,
                conditionallyShowPredicates: [
                  {
                    elementId: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                    optionIds: ['9e50b6e5-52b7-48ab-ab86-542ccba82205'],
                  },
                  {
                    elementId: '8e4d819b-97fa-438d-b613-a092d38c3b27',
                    optionIds: ['5c82ef40-779a-46fb-8860-c9b4969518ec'],
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '67dd8946-89dd-43b6-9b04-aca333a12c29',
                name: 'Test_on_multi_lines',
                label: 'Test on multi lines',
                type: 'textarea',
                required: false,
                defaultValue: 'multi line text',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
                name: 'What_was_the_time',
                label: 'What was the time',
                type: 'time',
                required: false,
                defaultValue: '1970-01-01T05:28:26.448Z',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb5103',
                name: 'More_Information',
                label: 'More Information',
                type: 'html',
                defaultValue: '<p><b>bold text here<b></p>',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb9999',
                name: 'calculation',
                label: 'calculations',
                type: 'calculation',
                calculation: '(69*69)+58008',
                defaultValue: '<p><b>{result}<b></p>',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7103',
                name: 'Barcode_Scanner',
                label: 'Please Scan Barcode of Box',
                type: 'barcodeScanner',
                required: false,
                defaultValue: '123ABC098ZYX',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'bb1b3d16-f3e1-4833-a273-19ea18e00582',
                name: 'Samples',
                label: 'Collect samples',
                type: 'repeatableSet',
                minSetEntries: 0,
                maxSetEntries: 5,
                addSetEntryLabel: 'Add an entry',
                removeSetEntryLabel: 'Remove this entry',
                elements: [
                  {
                    id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                    name: 'What_was_the_time',
                    label: 'What was the time',
                    type: 'time',
                    required: false,
                    defaultValue: '1970-01-01T05:28:26.448Z',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'a5289278-5cb4-4103-90b6-f67dde84dee7',
                name: 'email',
                label: 'email',
                type: 'email',
                defaultValue: 'developers@oneblink.io',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
                name: 'My_Cat',
                label: 'My Cat',
                type: 'image',
                defaultValue:
                  'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b527bcea-dc84-477f-a5ee-d34abfec92fb',
                name: 'telephone',
                label: 'telephone',
                type: 'telephone',
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '042508a4-4a8d-4684-9fd3-640a5018697d',
                name: 'autocomplete',
                label: 'autocomplete',
                type: 'autocomplete',
                options: [
                  {
                    id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
                    value: 'ONE',
                    label: 'one',
                  },
                  {
                    id: '5c82ef40-779a-46fb-8860-c9b4969518ec',
                    value: 'TWO',
                    label: 'two',
                  },
                  {
                    id: '55568d62-6ac5-4504-a88d-e2311a026776',
                    value: 'THREE',
                    label: 'three',
                  },
                ],
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'b8a635eb-d28c-4f18-b400-5e2b458e76e9',
                type: 'form',
                name: 'form',
                formId: 1,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '1495d816-e2b5-4b99-b378-fa7cd46e034c',
                type: 'infoPage',
                name: 'infoPage',
                formId: 2,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '042508a4-4a8d-4684-9fd3-640a5018697e',
                name: 'data_lookup_text',
                label: 'Data Lookup text',
                type: 'text',
                isDataLookup: true,
                dataLookupId: 1,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: '93624277-22cb-46f2-88f0-035b9837e09d',
                name: 'element_lookup_text',
                label: 'Element Lookup text',
                type: 'text',
                isElementLookup: true,
                elementLookupId: 2,
              },
              props,
            ),
            Object.assign(
              {},
              {
                id: 'f138d54f-c30f-49d8-9d2c-a8191643a887',
                name: 'both_types_lookup_text',
                label: 'Both Types Lookup text',
                type: 'text',
                isElementLookup: true,
                elementLookupId: 2,
                isDataLookup: true,
                dataLookupId: 1,
              },
              props,
            ),
          ],
        },
      ],
    }
  }

  test('should remove properties that are not part of the schema', () => {
    const extraProps = {
      withExtra: 'props',
      shouldBe: 'removed',
      especially: ['really', 'wrong', 1337, { boo: 'yah' }],
      things: {
        whee: 'doh!',
        elements: ['muhahahahaha'],
      },
    }
    const form = createForm(extraProps)
    const { value: result } = formSchema.validate(form, {
      stripUnknown: true,
    })

    result.elements[0].elements.forEach((element: FormTypes.FormElement) => {
      expect(element).toEqual(expect.not.objectContaining(extraProps))
    })
  })

  test('should strip out properties that are not valid for the element type', () => {
    const shouldBeRemoved = {
      minSetEntries: 2,
      maxSetEntries: -1,
      isSlider: true,
      minNumber: 0,
      maxNumber: -32,
      attributesMapping: [{}],
      preCalculationDisplay: 'asfdsafsaf',
      calculation: '1 + 1 = window',
    }

    const { error, value } = formSchema.validate({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      submissionEvents: [],
      tags: [],
      elements: [
        Object.assign(
          {},
          {
            id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
            name: 'My_Cat',
            label: 'My Cat',
            type: 'image',
            defaultValue:
              'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
          },
          shouldBeRemoved,
        ),
      ],
    })
    expect(error).toBeFalsy()
    expect(value.elements[0]).toEqual(
      expect.not.objectContaining(shouldBeRemoved),
    )
  })

  test('should strip out `redirectUrl` if `postSubmissionAction` is not "URL" and set default cancelAction', () => {
    const { error, value } = formSchema.validate({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      redirectUrl: 123,
      submissionEvents: [],
      tags: [],
      elements: [],
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      cancelAction: 'BACK',
      submissionEvents: [],
      tags: [],
      elements: [],
      isAuthenticated: false,
      isMultiPage: false,
    })
  })

  test('should allow `postSubmissionReceipt.html` if `postSubmissionAction` is not "URL"', () => {
    const { error, value } = formSchema.validate({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'BACK',
      postSubmissionReceipt: {
        html: '<p>test</p>',
      },
      cancelAction: 'BACK',
      submissionEvents: [],
      tags: [],
      elements: [],
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'BACK',
      postSubmissionReceipt: {
        html: '<p>test</p>',
      },
      cancelAction: 'BACK',
      submissionEvents: [],
      tags: [],
      elements: [],
      isAuthenticated: false,
      isMultiPage: false,
    })
  })
  test('should allow `postSubmissionReceipt.allowPDFDownload` if `postSubmissionAction` is not "URL"', () => {
    const { error, value } = formSchema.validate({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'BACK',
      postSubmissionReceipt: {
        allowPDFDownload: {
          pdfFileName: 'my.pdf',
          includeSubmissionIdInPdf: true,
          includePaymentInPdf: true,
          excludedElementIds: [],
          usePagesAsBreaks: true,
          approvalFormsInclusion: {
            value: 'ALL',
          },
        },
      },
      cancelAction: 'BACK',
      submissionEvents: [],
      tags: [],
      elements: [],
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      name: 'Inspection',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'BACK',
      postSubmissionReceipt: {
        allowPDFDownload: {
          pdfFileName: 'my.pdf',
          includeSubmissionIdInPdf: true,
          includePaymentInPdf: true,
          excludedElementIds: [],
          excludedCSSClasses: [],
          usePagesAsBreaks: true,
          approvalFormsInclusion: {
            value: 'ALL',
          },
        },
      },
      cancelAction: 'BACK',
      submissionEvents: [],
      tags: [],
      elements: [],
      isAuthenticated: false,
      isMultiPage: false,
    })
  })
  test('should throw error for `postSubmissionReceipt.allowPdfDownload.excludedElementIds` contains element ids that do not exist on the form', () => {
    const run = () =>
      validateFormThrowError({
        name: 'Inspection',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        postSubmissionAction: 'BACK',
        postSubmissionReceipt: {
          allowPDFDownload: {
            excludedElementIds: ['a5289278-5cb4-4103-90b6-f67ffe84dee7'],
          },
        },
        cancelAction: 'BACK',
        submissionEvents: [],
        tags: [],
        elements: [],
      })
    expect(run).toThrow(
      '"postSubmissionReceipt.allowPDFDownload.excludedElementIds[0]" (a5289278-5cb4-4103-90b6-f67ffe84dee7) does not exist in "elements".',
    )
  })

  test('should strip out label" for `form` element type', () => {
    const { error, value } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'form',
      name: 'name',
      label: 'label',
      formId: 1,
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'form',
      name: 'name',
      readOnly: false,
      formId: 1,
      conditionallyShow: false,
    })
  })

  test('Should not allow SEARCH option type for SELECT element', () => {
    const { error } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'select',
      name: 'select',
      label: 'select',
      optionsType: 'SEARCH',
    })
    expect(error?.message).toContain(
      '"optionsType" must be one of [CUSTOM, DYNAMIC, FRESHDESK_FIELD]',
    )
  })

  test('Should NOT allow SEARCH option type for CHECKBOXES element', () => {
    const { error } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'checkboxes',
      name: 'checkboxes',
      label: 'checkboxes',
      optionsType: 'SEARCH',
    })
    expect(error?.message).toContain(
      '"optionsType" must be one of [CUSTOM, DYNAMIC, FRESHDESK_FIELD]',
    )
  })

  test('Should not allow SEARCH option type for RADIO element', () => {
    const { error } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'radio',
      name: 'radio',
      label: 'radio',
      optionsType: 'SEARCH',
    })
    expect(error?.message).toContain(
      '"optionsType" must be one of [CUSTOM, DYNAMIC, FRESHDESK_FIELD]',
    )
  })

  test('Should allow SEARCH option type for AUTOCOMPLETE element', () => {
    const { error, value } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'autocomplete',
      name: 'autocomplete',
      label: 'autocomplete',
      optionsType: 'SEARCH',
      searchUrl: 'https://search.com',
      searchQuerystringParameter: 'filter',
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      conditionallyShow: false,
      conditionallyShowOptions: false,
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      isDataLookup: false,
      isElementLookup: false,
      label: 'autocomplete',
      name: 'autocomplete',
      optionsType: 'SEARCH',
      readOnly: false,
      required: false,
      type: 'autocomplete',
      searchUrl: 'https://search.com',
      searchQuerystringParameter: 'filter',
    })
  })

  test('Should allow searchUrl propery as a string for autocomplete when optionsType is SEARCH', () => {
    const { error, value } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'autocomplete',
      name: 'autocomplete',
      label: 'autocomplete',
      optionsType: 'SEARCH',
      searchUrl: 'https://search.com',
    })
    expect(error).toBeFalsy()
    expect(value).toEqual({
      conditionallyShow: false,
      conditionallyShowOptions: false,
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      isDataLookup: false,
      isElementLookup: false,
      label: 'autocomplete',
      name: 'autocomplete',
      optionsType: 'SEARCH',
      readOnly: false,
      required: false,
      type: 'autocomplete',
      searchUrl: 'https://search.com',
    })
  })

  test('Should throw error when searchUrl is not included for autocomplete when optionsType is SEARCH', () => {
    const { error } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'autocomplete',
      name: 'autocomplete',
      label: 'autocomplete',
      optionsType: 'SEARCH',
    })
    expect(error?.message).toBe('"searchUrl" is required')
  })
})

test('should allow restrictFileTypes and restrictedFileTypes properties for File element', () => {
  const result = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: false,
  })
  expect(result.error).toBe(undefined)

  const { error, value } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: true,
    restrictedFileTypes: ['png', 'jpg', 'gif'],
  })
  expect(error).toBeFalsy()
  expect(value).toEqual({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    readOnly: false,
    conditionallyShow: false,
    restrictFileTypes: true,
    restrictedFileTypes: ['png', 'jpg', 'gif'],
    restrictFileSize: false,
    isDataLookup: false,
    isElementLookup: false,
    allowExtensionlessAttachments: false,
  })
})

test('should strip restrictedFileTypes if restrictFileTypes is false', () => {
  const { error, value } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: false,
    restrictedFileTypes: ['png'],
  })
  expect(error).toBeFalsy()
  expect(value).toEqual({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    readOnly: false,
    conditionallyShow: false,
    restrictFileTypes: false,
    restrictFileSize: false,
    isDataLookup: false,
    isElementLookup: false,
    allowExtensionlessAttachments: false,
  })
})

test('should only allow strings in restrictedFileTypes', () => {
  const { error } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: true,
    restrictedFileTypes: [{ fileType: 'png' }],
  })
  expect(error?.message).toBe('"restrictedFileTypes[0]" must be a string')
})

test('should throw error if restrictFileTypes is true and restrictedFileTypes is null', () => {
  const { error } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: true,
    restrictedFileTypes: null,
  })
  expect(error?.message).toBe('"restrictedFileTypes" must be an array')
})

test('should throw error if restrictFileTypes is true and restrictedFileTypes is undefined', () => {
  const { error } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    restrictFileTypes: true,
  })
  expect(error?.message).toBe('"restrictedFileTypes" is required')
})

test('should throw error if minEntries is greater than maxEntries', () => {
  const { error } = elementSchema.validate({
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    minEntries: 3,
    maxEntries: 2,
  })
  expect(error?.message).toContain(
    '"maxEntries" must be greater than or equal to 3',
  )
})

test('should allow defaultValue for files element with "private" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    storageType: 'private',
    defaultValue: [
      {
        s3: {
          region: 'ap-southeast-2',
          bucket: 'customer.forms.oneblink.io',
          key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        },
        url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        contentType: 'image/png',
        fileName: 'dot.png',
        id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
        isPrivate: true,
      },
    ],
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue for files element with "public" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    storageType: 'public',
    defaultValue: [
      {
        s3: {
          region: 'ap-southeast-2',
          bucket: 'customer.forms.oneblink.io',
          key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        },
        url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        contentType: 'image/png',
        fileName: 'dot.png',
        id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
        isPrivate: true,
      },
    ],
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should not allow invalid values for storageType for files element', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    storageType: 'invalid',
  }
  const { error } = elementSchema.validate(input)
  expect(error?.message).toBe('"storageType" must be one of [public, private]')
})

test('should convert "legacy" to "private" storageType for files element', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    storageType: 'legacy',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.storageType).toBe('private')
})

test('should allow defaultValue in "private" format for files element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    defaultValue: [
      {
        s3: {
          region: 'ap-southeast-2',
          bucket: 'customer.forms.oneblink.io',
          key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        },
        url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
        contentType: 'image/png',
        fileName: 'dot.png',
        id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
        isPrivate: true,
      },
    ],
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue for camera element with "private" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    storageType: 'private',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue for camera element with "public" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    storageType: 'public',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should convert "legacy" to "private" storageType for camera element', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    storageType: 'legacy',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.storageType).toBe('private')
})

test('should allow defaultValue in "private" format for files element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue for draw element with "private" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    storageType: 'private',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue for draw element with "public" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    storageType: 'public',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should convert "legacy" to "private" storageType for draw element', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    storageType: 'legacy',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.storageType).toBe('private')
})

test('should allow defaultValue in "private" format for draw element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    defaultValue: {
      s3: {
        region: 'ap-southeast-2',
        bucket: 'customer.forms.oneblink.io',
        key: 'submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      },
      url: 'https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43',
      contentType: 'image/png',
      fileName: 'dot.png',
      id: '44cdee6f-edbd-4620-aaf5-df25ce976e43',
      isPrivate: true,
    },
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow placeholderValue property for these elements', () => {
  const result = formSchema.validate({
    name: 'Placeholders Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
    tags: [],
    elements: [
      {
        id: '01c69734-2543-4cc5-a3ef-d12de468475a',
        name: 'Text_Area',
        label: 'Text Areass',
        type: 'textarea',
        required: false,
        defaultValue: 'Multi line text',
        placeholderValue: 'placeholder',
      },
      {
        id: '59b723a9-00e2-493f-8d76-84ea71a178ee',
        name: 'Just_Text',
        label: 'Just Text',
        type: 'text',
        required: false,
        defaultValue: 'single line text',
        placeholderValue: 'placeholder',
      },
      {
        id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18ba',
        name: 'Numbers_and_more',
        label: 'Numbers and more',
        type: 'number',
        required: false,
        isSlider: false,
        defaultValue: 3,
        placeholderValue: 'placeholder',
      },
      {
        id: 'a5289278-5cb4-4103-90b6-f67dde84dee7',
        name: 'email',
        label: 'email',
        type: 'email',
        defaultValue: 'developers@oneblink.io',
        placeholderValue: 'placeholder',
      },
      {
        id: 'b527bcea-dc84-477f-a5ee-d34abfec92fb',
        name: 'telephone',
        label: 'telephone',
        type: 'telephone',
        placeholderValue: 'placeholder',
      },
      {
        id: '042508a4-4a8d-4684-9fd3-640a5018697d',
        name: 'autocomplete',
        label: 'autocomplete',
        type: 'autocomplete',
        placeholderValue: 'placeholder',
        options: [
          {
            id: '9e50b6e5-52b7-48ab-ab86-542ccba82205',
            value: 'ONE',
            label: 'one',
          },
        ],
      },
      {
        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7103',
        name: 'Barcode_Scanner',
        label: 'Please Scan Barcode of Box',
        type: 'barcodeScanner',
        required: false,
        defaultValue: '123ABC098ZYX',
        placeholderValue: 'placeholder',
      },
      {
        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7104',
        name: 'Date',
        label: 'Date',
        type: 'date',
        required: false,
        placeholderValue: 'placeholder',
      },
      {
        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7105',
        name: 'Date_Time',
        label: 'Date Time',
        type: 'datetime',
        required: false,
        placeholderValue: 'placeholder',
      },
      {
        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb7106',
        name: 'Time',
        label: 'Time',
        type: 'time',
        required: false,
        placeholderValue: 'placeholder',
      },
    ],
  })
  expect(result.error).toBe(undefined)
  for (const element of result.value.elements) {
    expect(element.placeholderValue).toBe('placeholder')
  }
})

test('should allow forms without tags', () => {
  const result = formSchema.validate({
    name: 'Tags Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
    elements: [],
  })
  expect(result.value.tags).toEqual([])
  expect(result.error).toBe(undefined)
})

test('should not allow publish start date after publish end date', () => {
  expect(() =>
    validateFormThrowError({
      name: 'Tags Form',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      submissionEvents: [],
      elements: [],
      publishStartDate: '2020-06-21T02:00:00.000Z',
      publishEndDate: '2020-06-20T02:00:00.000Z',
    }),
  ).toThrow(
    '"publishStartDate" (2020-06-21T02:00:00.000Z) must be before "publishEndDate" (2020-06-20T02:00:00.000Z)',
  )
})

describe('submission event configuration', () => {
  test('should reject if configuration is not supplied', () => {
    const { error } = formSchema.validate(
      {
        name: 'string',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        tags: [],
        elements: [],
        isAuthenticated: true,
        submissionEvents: [
          {
            type: 'PDF',
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.message).toBe(
      '"submissionEvents[0].configuration" is required',
    )
  })
})

describe('Date and Time `NOW` option', () => {
  const form = {
    name: 'Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
  }
  test('should allow datetime, date and time elements with NOW defaults', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
          name: 'Date_and_Time',
          label: 'Date and Time',
          type: 'datetime',
          required: false,
          defaultValue: 'NOW',
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
          name: 'Just_Time',
          label: 'Just Time',
          type: 'time',
          required: false,
          defaultValue: 'NOW',
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
        },
      ],
    })
    expect(result.error).toBe(undefined)
  })

  test('should not allow datetime, date and time elements with any other strings as default', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Date_and_Time',
            label: 'Date and Time',
            type: 'datetime',
            required: false,
            defaultValue: 'OTHER_STRINGS',
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700d',
            name: 'Just_Time',
            label: 'Just Time',
            type: 'time',
            required: false,
            defaultValue: 'OTHER_STRINGS',
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'OTHER_STRINGS',
          },
        ],
      },
      {
        abortEarly: false,
        stripUnknown: true,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].defaultValue" must be in ISO 8601 date format',
    )
    expect(result.error?.details[1].message).toBe(
      '"elements[1].defaultValue" must be in ISO 8601 date format',
    )
    expect(result.error?.details[2].message).toBe(
      '"elements[2].defaultValue" must be in ISO 8601 date format',
    )
  })

  test('should allow date and date/time elements to have daysOffset values', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Date_and_Time',
            label: 'Date and Time',
            type: 'datetime',
            required: false,
            defaultValue: 'NOW',
            defaultValueDaysOffset: 5,
            fromDate: 'NOW',
            fromDateDaysOffset: 4,
            toDate: 'NOW',
            toDateDaysOffset: 6,
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            defaultValueDaysOffset: -4,
            fromDate: 'NOW',
            fromDateDaysOffset: -6,
            toDate: 'NOW',
            toDateDaysOffset: -3,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    // DATETIME
    expect(result.value.elements[0].defaultValue).toBe('NOW')
    expect(result.value.elements[0].defaultValueDaysOffset).toBe(5)
    expect(result.value.elements[0].fromDate).toBe('NOW')
    expect(result.value.elements[0].fromDateDaysOffset).toBe(4)
    expect(result.value.elements[0].toDate).toBe('NOW')
    expect(result.value.elements[0].toDateDaysOffset).toBe(6)
    // DATE
    expect(result.value.elements[1].defaultValue).toBe('NOW')
    expect(result.value.elements[1].defaultValueDaysOffset).toBe(-4)
    expect(result.value.elements[1].fromDate).toBe('NOW')
    expect(result.value.elements[1].fromDateDaysOffset).toBe(-6)
    expect(result.value.elements[1].toDate).toBe('NOW')
    expect(result.value.elements[1].toDateDaysOffset).toBe(-3)
  })
  test('should allow combinations of `NOW` and static dates ', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Date_and_Time',
            label: 'Date and Time',
            type: 'datetime',
            required: false,
            defaultValue: 'NOW',
            defaultValueDaysOffset: 5,
            fromDate: '2021-05-25T00:00:00.000Z',
            fromDateDaysOffset: 2,
            toDate: 'NOW',
            toDateDaysOffset: 6,
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            fromDate: 'NOW',
            fromDateDaysOffset: -6,
            toDate: '2021-05-25',
            toDateDaysOffset: 2,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    // DATETIME
    expect(result.value.elements[0].defaultValue).toBe('NOW')
    expect(result.value.elements[0].defaultValueDaysOffset).toBe(5)
    expect(result.value.elements[0].fromDate).toBe('2021-05-25T00:00:00.000Z')
    expect(result.value.elements[0].fromDateDaysOffset).toBe(undefined)
    expect(result.value.elements[0].toDate).toBe('NOW')
    expect(result.value.elements[0].toDateDaysOffset).toBe(6)
    // DATE
    expect(result.value.elements[1].defaultValue).toBe('NOW')
    expect(result.value.elements[1].defaultValueDaysOffset).toBe(undefined)
    expect(result.value.elements[1].fromDate).toBe('NOW')
    expect(result.value.elements[1].fromDateDaysOffset).toBe(-6)
    expect(result.value.elements[1].toDate).toBe('2021-05-25')
    expect(result.value.elements[1].toDateDaysOffset).toBe(undefined)
  })

  test('should allow fromDateDaysOffset when fromDateElementId is set', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          fromDateElementId: 'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
          fromDateDaysOffset: 6,
        },
      ],
    })
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].fromDateElementId).toBe(
      'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
    )
    expect(result.value.elements[0].fromDateDaysOffset).toBe(6)
  })

  test('should allow toDateDaysOffset when toDateElementId is set', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          toDateElementId: 'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
          toDateDaysOffset: 8,
        },
      ],
    })
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].toDateElementId).toBe(
      'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
    )
    expect(result.value.elements[0].toDateDaysOffset).toBe(8)
  })

  test('should throw error when `toDateElementId` is before `fromDateElementId`', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            fromDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            fromDateDaysOffset: -6,
            toDateElementId: '3424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            toDateDaysOffset: -8,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].toDateDaysOffset" must be greater than or equal to -6',
    )
  })

  test('Should allow both toDate and toDateElementId', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          toDate: 'NOW',
          toDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12ef',
        },
      ],
    })
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].toDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12ef',
    )
    expect(result.value.elements[0].toDate).toBe('NOW')
  })

  test('Should allow both fromDate and fromDateElementId', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          fromDate: 'NOW',
          fromDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12ec',
        },
      ],
    })

    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].fromDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12ec',
    )
    expect(result.value.elements[0].fromDate).toBe('NOW')
  })

  test('Should generate fromDateDaysOffset even though there is fromDate and fromDateElementId', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          fromDate: 'NOW',
          fromDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12ef',
          fromDateDaysOffset: 6,
        },
      ],
    })
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].fromDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12ef',
    )
    expect(result.value.elements[0].fromDate).toBe('NOW')

    expect(result.value.elements[0].fromDateDaysOffset).toBe(6)
  })

  test('Should generate toDateDaysOffset even though there is toDate and toDateElementId', () => {
    const result = formSchema.validate({
      ...form,
      elements: [
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          toDate: 'NOW',
          toDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12e5',
          toDateDaysOffset: 8,
        },
      ],
    })
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].toDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12e5',
    )
    expect(result.value.elements[0].toDate).toBe('NOW')

    expect(result.value.elements[0].toDateDaysOffset).toBe(8)
  })

  test('Should allow mixture of elementIds and dates', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Date_and_Time',
            label: 'Date and Time',
            type: 'datetime',
            required: false,
            defaultValue: 'NOW',
            defaultValueDaysOffset: 5,
            fromDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12ee',
            fromDateDaysOffset: 2,
            toDate: 'NOW',
            toDateDaysOffset: 6,
          },
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            fromDate: 'NOW',
            fromDateDaysOffset: -6,
            toDateElementId: '1424f4ea-35a0-47ee-9c22-ef8e16cb12aa',
            toDateDaysOffset: 2,
          },
        ],
      },
      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)

    expect(result.value.elements[0].fromDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12ee',
    )
    expect(result.value.elements[0].fromDateDaysOffset).toBe(2)
    expect(result.value.elements[0].toDate).toBe('NOW')
    expect(result.value.elements[0].toDateDaysOffset).toBe(6)

    expect(result.value.elements[1].fromDate).toBe('NOW')
    expect(result.value.elements[1].fromDateDaysOffset).toBe(-6)
    expect(result.value.elements[1].toDateElementId).toBe(
      '1424f4ea-35a0-47ee-9c22-ef8e16cb12aa',
    )
    expect(result.value.elements[1].toDateDaysOffset).toBe(2)
  })

  test('Should not allow invalid guid', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            toDate: 'NOW',
            toDateElementId: '123',
            toDateDaysOffset: 8,
          },
        ],
      },
      {
        stripUnknown: true,
        abortEarly: false,
      },
    )

    expect(result.error?.details[0].message).toBe(
      '"elements[0].toDateElementId" must be a valid GUID',
    )
  })

  test('Should not allow if one guid is invalid', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            fromDateElementId: '123',
            toDateElementId: '2424f4ea-35a0-47ee-9c22-ef8e16cb12e3',
          },
        ],
      },
      {
        stripUnknown: true,
        abortEarly: false,
      },
    )

    expect(result.error?.details[0].message).toBe(
      '"elements[0].fromDateElementId" must be a valid GUID',
    )
  })

  test('should throw error when `toDate` is before `fromDate`', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
            name: 'Just_Date',
            label: 'Just Date',
            type: 'date',
            required: false,
            defaultValue: 'NOW',
            fromDate: 'NOW',
            fromDateDaysOffset: -6,
            toDate: 'NOW',
            toDateDaysOffset: -8,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].toDateDaysOffset" must be greater than or equal to -6',
    )
  })

  test('should allow when toDateElementId and fromDateElement are correctly configured', () => {
    validateFormThrowError({
      ...form,
      elements: [
        {
          id: 'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
          name: 'Just_Date',
          label: 'Just Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
        },
        {
          id: '2424f4ea-35a0-47ee-9c22-ef8e16cb12ed',
          name: 'Another_Date',
          label: 'Another Date',
          type: 'date',
          required: false,
          defaultValue: 'NOW',
          fromDateElementId: 'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
          toDateElementId: 'e5a05567-c666-45e3-bcd8-10e6ca0c2e1a',
          toDateDaysOffset: 8,
        },
      ],
    })
  })
})

describe('Regex Custom Validation Properties', () => {
  const form = {
    name: 'Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
  }

  test('should allow saving of all regex fields', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            regexPattern: '^[a-z]*$',
            regexFlags: 'dgimsuy',
            regexMessage: 'This is a regex error message',
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].regexPattern).toBe('^[a-z]*$')
    expect(result.value.elements[0].regexFlags).toBe('dgimsuy')
    expect(result.value.elements[0].regexMessage).toBe(
      'This is a regex error message',
    )
  })
  test('should strip regex config fields if pattern is not present', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            regexFlags: 'dgimsuy',
            regexMessage: 'This is a regex error message',
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].regexPattern).toBe(undefined)
    expect(result.value.elements[0].regexFlags).toBe(undefined)
    expect(result.value.elements[0].regexMessage).toBe(undefined)
  })
  test('should throw an error if invalid `flag` characters are present, and should require `regexMessage` when `regexPattern` is set', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            regexPattern: '^[a-z]*$',
            regexFlags: 'dgimsuyabc',
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details.length).toBe(2)
    expect(result.error?.details[0].message).toBe(
      '"elements[0].regexFlags" with value "dgimsuyabc" fails to match the required pattern: /^[dgimsuy]+$/',
    )
    expect(result.error?.details[1].message).toBe(
      '"elements[0].regexMessage" is required',
    )
  })
  test('should throw an error if regex pattern is invalid', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '398de8c3-104e-427f-bd90-099c00fd5d5b',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            regexPattern: '^[mM][a-Z]',
            regexMessage: 'This is a regex error message',
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details.length).toBe(1)
    expect(result.error?.details[0].message).toBe(
      '"elements[0].regexPattern" failed custom validation because it was an invalid regex pattern',
    )
  })
})

describe('canToggleAll property', () => {
  const form = {
    name: 'Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
  }

  test('should allow canToggleAll property and strip out for non multi select', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
            name: 'checkboxes_with_dynamic',
            label: 'Checkboxes',
            type: 'checkboxes',
            required: false,
            buttons: false,
            defaultValue: ['defaultOptionValue'],
            optionsType: 'DYNAMIC',
            dynamicOptionSetId: 1,
            canToggleAll: true,
          },
          {
            id: '9014e80c-3c68-4adb-a336-1be04ebc95ee',
            name: 'select_with_dynamic',
            label: 'Select',
            type: 'select',
            required: false,
            defaultValue: 'defaultOptionValue',
            optionsType: 'DYNAMIC',
            dynamicOptionSetId: 1,
            canToggleAll: true,
          },
          {
            id: '9014e80c-3c68-4adb-a337-1be04ebc95ee',
            name: 'multi_select_with_dynamic',
            label: 'Select',
            type: 'select',
            required: false,
            multi: true,
            defaultValue: ['defaultOptionValue'],
            optionsType: 'DYNAMIC',
            dynamicOptionSetId: 1,
            canToggleAll: true,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].canToggleAll).toBe(true)
    expect(result.value.elements[1].canToggleAll).toBeUndefined()
    expect(result.value.elements[2].canToggleAll).toBe(true)
  })
})

describe('Section Element', () => {
  const form = {
    name: 'Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
  }

  test('should allow section elements and set correct defaults', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
            label: 'Section Heading',
            isCollapsed: true,
            type: 'section',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                name: 'checkboxes_with_dynamic',
                label: 'Checkboxes',
                type: 'checkboxes',
                required: false,
                buttons: false,
                defaultValue: ['defaultOptionValue'],
                optionsType: 'DYNAMIC',
                dynamicOptionSetId: 1,
                canToggleAll: true,
              },
            ],
          },
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95e2',
            label: 'Section Heading 2',
            type: 'section',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                name: 'checkboxes_with_dynamic',
                label: 'Checkboxes',
                type: 'checkboxes',
                required: false,
                buttons: false,
                defaultValue: ['defaultOptionValue'],
                optionsType: 'DYNAMIC',
                dynamicOptionSetId: 1,
                canToggleAll: true,
              },
            ],
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    expect(result.value.elements[0].elements.length).toBe(1)
    expect(result.value.elements[0].isCollapsed).toBe(true)
    expect(result.value.elements[1].isCollapsed).toBe(false)
  })

  test('should allow nested section elements', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
            label: 'A',
            isCollapsed: true,
            type: 'section',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                label: 'B',
                type: 'section',
                elements: [
                  {
                    id: 'bb1b3d16-f3e1-4833-a273-19ea18e00582',
                    name: 'C',
                    label: 'C',
                    type: 'repeatableSet',
                    addSetEntryLabel: 'Add an entry',
                    removeSetEntryLabel: 'Remove this entry',
                    elements: [
                      {
                        id: '2424f4ea-35a0-47ee-9c22-ef8e16cb700e',
                        label: 'D',
                        type: 'section',
                        elements: [
                          {
                            id: 'bb1b3d16-f3e1-4833-a273-19ea18e00582',
                            name: 'Text',
                            type: 'text',
                            label: 'Text',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)

    expect(result.value.elements[0].elements[0].type).toBe('section')
    expect(
      result.value.elements[0].elements[0].elements[0].elements[0].type,
    ).toBe('section')
  })

  test('should reject section elements with invalid properties', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
            label: 'A',
            isCollapsed: true,
            type: 'section',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                label: 'B',
                type: 'section',
              },
            ],
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].elements[0]" failed custom validation because "elements" is required',
    )
  })
})

describe('Location Element', () => {
  const form = {
    name: 'Form',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    submissionEvents: [],
  }

  it('should pass validation', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: 'f689bc42-7412-4133-9f87-0da56bb9a922',
            label: 'Location',
            name: 'location',
            type: 'location',
            required: false,
          },
          {
            id: '1500d34b-616c-4690-b49b-f2803c37ce49',
            label: 'Location2',
            name: 'location2',
            type: 'location',
            required: false,
            reverseGeocoding: {
              formattedAddressElementId: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
              integrationType: 'GEOSCAPE',
            },
          },
          {
            id: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
            label: 'Text',
            name: 'text',
            type: 'text',
            required: false,
          },
          {
            id: '0cc654c2-4826-407e-9955-3be56c584623',
            label: 'Location3',
            name: 'location3',
            type: 'location',
            required: false,
          },
        ],
      },
      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
    expect(result.value.elements[1].reverseGeocoding).toEqual({
      formattedAddressElementId: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
      integrationType: 'GEOSCAPE',
    })
  })

  it('should fail validation - missing element Id', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '1500d34b-616c-4690-b49b-f2803c37ce49',
            label: 'Location',
            name: 'location',
            type: 'location',
            required: false,
            reverseGeocoding: {},
          },
          {
            id: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
            label: 'Text',
            name: 'text',
            type: 'text',
            required: false,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].reverseGeocoding.formattedAddressElementId" is required',
    )
  })

  it('should fail validation - bad integration type', () => {
    const result = formSchema.validate(
      {
        ...form,
        elements: [
          {
            id: '1500d34b-616c-4690-b49b-f2803c37ce49',
            label: 'Location',
            name: 'location',
            type: 'location',
            required: false,
            reverseGeocoding: {
              formattedAddressElementId: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
            },
          },
          {
            id: '45d3d40a-c68c-4a87-b751-8246a2466ddb',
            label: 'Text',
            name: 'text',
            type: 'text',
            required: false,
          },
        ],
      },

      {
        stripUnknown: true,
        abortEarly: false,
      },
    )
    expect(result.error?.details[0].message).toBe(
      '"elements[0].reverseGeocoding.integrationType" is required',
    )
  })
})

describe('approvalConfiguration', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a80',
        type: 'email',
        name: 'email',
        label: 'email',
      },
    ],
    tags: [],
  }

  test('Should save correct data valid', () => {
    const validatedForm = validateFormThrowError({
      ...form,
      approvalConfiguration: {
        defaultNotificationEmailElementId:
          'ff9b04c3-f2ad-4994-a525-e7189eb67a80',
      },
    })
    expect(
      validatedForm.approvalConfiguration?.defaultNotificationEmailElementId,
    ).toBe('ff9b04c3-f2ad-4994-a525-e7189eb67a80')
  })

  test('Should throw error if elementId is not a string', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalConfiguration: {
          defaultNotificationEmailElementId: 1,
        },
      }),
    ).toThrow(
      '"approvalConfiguration.defaultNotificationEmailElementId" must be a string',
    )
  })

  test('Should throw error if elementId is not a guid', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalConfiguration: {
          defaultNotificationEmailElementId: 'not a guid',
        },
      }),
    ).toThrow(
      '"approvalConfiguration.defaultNotificationEmailElementId" must be a valid GUID',
    )
  })

  test('Should throw error if element does not exist', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalConfiguration: {
          defaultNotificationEmailElementId:
            'ff9b04c3-f2ad-4994-a525-e7189eb67a81',
        },
      }),
    ).toThrow(
      '"approvalConfiguration.defaultNotificationEmailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a81) does not exist in "elements"',
    )
  })

  test('Should throw error if element is not an "email" type', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalConfiguration: {
          defaultNotificationEmailElementId:
            'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        },
      }),
    ).toThrow(
      '"approvalConfiguration.defaultNotificationEmailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a79) references an element that is not type "email" (text)',
    )
  })
})

describe('Approval Forms Inclusion Configuration', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
    ],
    tags: [],
  }

  test('Should save correct data when selecting "ALL"', () => {
    const submissionEvent = {
      type: 'PDF',
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      configuration: {
        email: 'developers@oneblink.io',
        excludedElementIds: [],
        approvalFormsInclusion: {
          value: 'ALL',
          approvalStepLabels: [],
        },
      },
    }
    const validatedForm = validateFormThrowError({
      ...form,
      approvalEvents: [submissionEvent],
    })
    expect(
      // @ts-expect-error Types
      validatedForm.approvalEvents?.[0].configuration.approvalFormsInclusion
        .value,
    ).toBe('ALL')
    expect(
      // @ts-expect-error Types
      validatedForm.approvalEvents?.[0].configuration.approvalFormsInclusion
        .approvalStepLabels,
    ).toBe(undefined)
  })

  test('Should require "approvalStepLabels" when selecting "PARTIAL"', () => {
    const submissionEvent = {
      type: 'PDF',
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      configuration: {
        email: 'developers@oneblink.io',
        excludedElementIds: [],
        approvalFormsInclusion: {
          value: 'PARTIAL',
        },
      },
    }
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalEvents: [submissionEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].configuration.approvalFormsInclusion.approvalStepLabels" is required',
    )
  })
})

describe('server validation', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [],
    tags: [],
  }

  test('should save correct data for "CALLBACK" server validation', () => {
    const configuration = {
      url: 'https://google.com',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      serverValidation: {
        type: 'CALLBACK',
        configuration,
      },
    })
    expect(validatedForm.serverValidation?.type).toBe('CALLBACK')
    expect(validatedForm.serverValidation?.configuration).toEqual(configuration)
  })

  test('should save correct data for "ONEBLINK_API" server validation', () => {
    const configuration = {
      apiId: 'customer-project.api.oneblink.io',
      apiEnvironment: 'dev',
      apiEnvironmentRoute: '/pathname',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      serverValidation: {
        type: 'ONEBLINK_API',
        configuration,
      },
    })
    expect(validatedForm.serverValidation?.type).toBe('ONEBLINK_API')
    expect(validatedForm.serverValidation?.configuration).toEqual(configuration)
  })

  test('should throw error for "RECEIPT_ID" server validation', () => {
    const configuration = {
      receiptComponents: [
        {
          type: 'text',
          value: 'value',
        },
      ],
    }
    expect(() =>
      validateFormThrowError({
        ...form,
        serverValidation: {
          type: 'RECEIPT_ID',
          configuration,
        },
      }),
    ).toThrow('"serverValidation.type" must be one of [CALLBACK, ONEBLINK_API]')
  })
})

describe('external id generation and personalisation', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [],
    tags: [],
  }

  test('should save data for "ONEBLINK_API" externalIdGenerationOnSubmit', () => {
    const configuration = {
      apiId: 'customer-project.api.oneblink.io',
      apiEnvironment: 'dev',
      apiEnvironmentRoute: '/pathname',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      externalIdGenerationOnSubmit: {
        type: 'ONEBLINK_API',
        configuration,
      },
    })
    expect(validatedForm.externalIdGenerationOnSubmit?.type).toBe(
      'ONEBLINK_API',
    )
    expect(validatedForm.externalIdGenerationOnSubmit?.configuration).toEqual(
      configuration,
    )
  })

  test('should save data for "CALLBACK" externalIdGenerationOnSubmit', () => {
    const configuration = {
      url: 'https://google.com',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      externalIdGenerationOnSubmit: {
        type: 'CALLBACK',
        configuration,
      },
    })
    expect(validatedForm.externalIdGenerationOnSubmit?.type).toBe('CALLBACK')
    expect(validatedForm.externalIdGenerationOnSubmit?.configuration).toEqual(
      configuration,
    )
  })

  test('should save data for "RECEIPT_ID" externalIdGenerationOnSubmit', () => {
    const configuration = {
      receiptComponents: [
        {
          type: 'text',
          value: 'value',
        },
        {
          type: 'date',
          format: 'dayOfMonth',
        },
        {
          type: 'random',
          length: 2,
          uppercase: true,
          lowercase: true,
          numbers: true,
        },
        {
          type: 'text',
          value: 'value',
        },
      ],
    }
    const validatedForm = validateFormThrowError({
      ...form,
      externalIdGenerationOnSubmit: {
        type: 'RECEIPT_ID',
        configuration,
      },
    })
    expect(validatedForm.externalIdGenerationOnSubmit?.type).toBe('RECEIPT_ID')
    expect(validatedForm.externalIdGenerationOnSubmit?.configuration).toEqual(
      configuration,
    )
  })

  test('should throw error when trying to do "RECEIPT_ID" on personalisation', () => {
    const configuration = {
      receiptComponents: [
        {
          type: 'text',
          value: 'value',
        },
      ],
    }

    expect(() =>
      validateFormThrowError({
        ...form,
        personalisation: {
          type: 'RECEIPT_ID',
          configuration,
        },
      }),
    ).toThrow('"personalisation.type" must be one of [CALLBACK, ONEBLINK_API]')
  })

  test('should throw error when attempting to save a "RECEIPT_ID" with 2 "sequentialNumber" components', () => {
    const configuration = {
      receiptComponents: [
        {
          type: 'sequentialNumber',
        },
        {
          type: 'text',
          value: 'value',
        },
        {
          type: 'sequentialNumber',
        },
      ],
    }

    expect(() =>
      validateFormThrowError({
        ...form,
        externalIdGenerationOnSubmit: {
          type: 'RECEIPT_ID',
          configuration,
        },
      }),
    ).toThrow(
      '"externalIdGenerationOnSubmit.configuration.receiptComponents" can only contain one "sequentialNumber" type.',
    )
  })

  test('should pass successfully for a "RECEIPT_ID" with a "sequentialNumber" component', () => {
    const configuration = {
      receiptComponents: [
        {
          type: 'text',
          value: 'value',
        },
        {
          type: 'sequentialNumber',
        },
      ],
    }
    const validatedForm = validateFormThrowError({
      ...form,
      externalIdGenerationOnSubmit: {
        type: 'RECEIPT_ID',
        configuration,
      },
    })
    expect(validatedForm.externalIdGenerationOnSubmit?.type).toBe('RECEIPT_ID')
    expect(validatedForm.externalIdGenerationOnSubmit?.configuration).toEqual(
      configuration,
    )
  })

  test('should save "ONEBLINK_API" for personalisation', () => {
    const configuration = {
      apiId: 'customer-project.api.oneblink.io',
      apiEnvironment: 'dev',
      apiEnvironmentRoute: '/pathname',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      personalisation: {
        type: 'ONEBLINK_API',
        configuration,
      },
    })
    expect(validatedForm.personalisation?.type).toBe('ONEBLINK_API')
    expect(validatedForm.personalisation?.configuration).toEqual(configuration)
  })

  test('should save "CALLBACK" for personalisation', () => {
    const configuration = {
      url: 'https://google.com',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      personalisation: {
        type: 'CALLBACK',
        configuration,
      },
    })
    expect(validatedForm.personalisation?.type).toBe('CALLBACK')
    expect(validatedForm.personalisation?.configuration).toEqual(configuration)
  })

  test('should save data when externalIdGenerationOnSubmit and personalisation exist', () => {
    const personalisationConfiguration = {
      apiId: 'customer-project.api.oneblink.io',
      apiEnvironment: 'dev',
      apiEnvironmentRoute: '/personalisation',
      organisationManagedSecretId: 1,
    }
    const externalIdConfiguration = {
      apiId: 'customer-project.api.oneblink.io',
      apiEnvironment: 'dev',
      apiEnvironmentRoute: '/external-id',
      organisationManagedSecretId: 1,
    }
    const validatedForm = validateFormThrowError({
      ...form,
      externalIdGenerationOnSubmit: {
        type: 'ONEBLINK_API',
        configuration: externalIdConfiguration,
      },
      personalisation: {
        type: 'ONEBLINK_API',
        configuration: personalisationConfiguration,
      },
    })

    expect(validatedForm.externalIdGenerationOnSubmit?.type).toBe(
      'ONEBLINK_API',
    )
    expect(validatedForm.externalIdGenerationOnSubmit?.configuration).toEqual(
      externalIdConfiguration,
    )

    expect(validatedForm.personalisation?.type).toBe('ONEBLINK_API')
    expect(validatedForm.personalisation?.configuration).toEqual(
      personalisationConfiguration,
    )
  })

  describe('should reject with correct validation errors for non unique element names', () => {
    expect(() =>
      validateFormThrowError({
        name: 'Form',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: '59cc888b8969af000fb50ddb',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: true,
        submissionEvents: [],
        elements: [
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
            label: 'Page Heading',
            type: 'page',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                label: 'section 1',
                type: 'section',
                elements: [
                  {
                    id: 'dee04cf1-ab5a-4854-9166-e71a87404fd1',
                    name: 'text',
                    type: 'text',
                    label: 'text 1',
                  },
                ],
              },
            ],
          },
          {
            id: '9014e80c-3c68-4adb-a335-1be04ebc95e2',
            label: 'Page Heading 2',
            type: 'page',
            elements: [
              {
                id: '9014e80c-3c68-4adb-a335-1be04ebc95ef',
                label: 'section 2',
                type: 'section',
                elements: [
                  {
                    id: 'dee04cf1-ab5a-4854-9166-e71a87404fd2',
                    name: 'text',
                    type: 'text',
                    label: 'text 2',
                  },
                ],
              },
            ],
          },
        ],
      }),
    ).toThrow(
      '"elements" contains an element with a "name" (text) property that is not unique',
    )
  })
})

describe('Slug', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
    ],
    tags: [],
  }

  test('should have appropriate error message when slug is invalid', () => {
    const fn = () =>
      validateFormThrowError({
        ...form,
        slug: 'this is not valid',
      })
    expect(fn).toThrow(
      '"slug" with value "this is not valid" fails to match the required pattern: /^[a-z][a-z\\d-]*$/',
    )
  })
})

describe('Approval Step Nodes', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
    ],
    tags: [],
    approvalSteps: [
      //  Existing step format
      {
        group: 'group 1',
        label: 'Label 1',
        approvalFormId: 1,
        conditionalPredicates: [],
        isConditional: false,
        requiresAllConditionalPredicates: false,
      },
      {
        type: 'STANDARD',
        group: 'group 1',
        label: 'Label 2',
        approvalFormId: 1,
        conditionalPredicates: [],
        isConditional: false,
        requiresAllConditionalPredicates: false,
      },
      {
        type: 'CONCURRENT',
        nodes: [
          {
            label: 'Label 3',
            group: 'group 1',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
          {
            label: 'Label 4',
            group: 'group 2',
            approvalFormId: 2,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
        ],
      },
    ],
  }

  it('should not throw an error for correctly typed data', () => {
    expect(() => {
      validateFormThrowError(form)
    }).not.toThrow()
  })

  it('should throw an error when trying to pass an invalid `type`', () => {
    expect(() => {
      validateFormThrowError({
        ...form,
        approvalSteps: [
          {
            type: '123',
            group: 'group 1',
            label: 'Label 2',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
        ],
      })
    }).toThrow('"approvalSteps[0]" does not match any of the allowed types')
  })
  it('should throw an error when trying to pass mismatching properties', () => {
    expect(() => {
      validateFormThrowError({
        ...form,
        approvalSteps: [
          {
            type: 'CONCURRENT',
            group: 'group 1',
            label: 'Label 2',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
        ],
      })
    }).toThrow('"approvalSteps[0]" does not match any of the allowed types')
  })
  it('should throw an error when trying to pass duplicate labels (concurrent)', () => {
    expect(() => {
      validateFormThrowError({
        ...form,
        approvalSteps: [
          //  Existing step format
          {
            group: 'group 1',
            label: 'Label 1',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
          {
            type: 'CONCURRENT',
            nodes: [
              {
                label: 'Label 1',
                group: 'group 1',
                approvalFormId: 1,
                conditionalPredicates: [],
                isConditional: false,
                requiresAllConditionalPredicates: false,
              },
            ],
          },
        ],
      })
    }).toThrow(
      '"approvalSteps" contains a CONCURRENT step with a "label" (Label 1) property that is not unique',
    )
  })
  it('should throw an error when trying to pass duplicate labels (standard)', () => {
    expect(() => {
      validateFormThrowError({
        ...form,
        approvalSteps: [
          //  Existing step format
          {
            group: 'group 1',
            label: 'Label 1',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
          {
            type: 'STANDARD',
            group: 'group 1',
            label: 'Label 1',
            approvalFormId: 1,
            conditionalPredicates: [],
            isConditional: false,
            requiresAllConditionalPredicates: false,
          },
        ],
      })
    }).toThrow(
      '"approvalSteps" contains a STANDARD step with a "label" (Label 1) property that is not unique',
    )
  })
})

describe('lookupButton form element', () => {
  const form = {
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [],
    tags: [],
  }

  const lookupButtonElement = {
    id: '9014e80c-3c68-4adb-a338-1be04ebc9511',
    name: 'My_Lookup_Button',
    label: 'My Lookup Button',
    type: 'lookupButton',
    isDataLookup: true,
    dataLookupId: 1,
  }

  test('should default "elementDependencies" to empty array', () => {
    const result = validateFormThrowError({
      ...form,
      elements: [lookupButtonElement],
    })
    expect(result.elements[0]).toEqual({
      ...lookupButtonElement,
      conditionallyShow: false,
      isElementLookup: false,
      elementDependencies: [],
    })
  })

  test('should have appropriate error message when no lookup configration has been set', () => {
    const fn = () =>
      validateFormThrowError({
        ...form,
        elements: [
          {
            ...lookupButtonElement,
            isDataLookup: false,
            isElementLookup: false,
            dataLookupId: undefined,
            elementLookupId: undefined,
            elementDependencies: [],
          },
        ],
      })
    expect(fn).toThrow(
      '"elements[0]" must contain at least one of [isDataLookup, isElementLookup]',
    )
  })

  test('should handle "REPEATABLE_SET_FORM_ELEMENT" type', () => {
    const result = validateFormThrowError({
      ...form,
      elements: [
        {
          type: 'repeatableSet',
          id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
          name: 'My_Repeatable_Set',
          label: 'My Repeatable Set',
          addSetEntryLabel: 'Add an entry',
          removeSetEntryLabel: 'Remove this entry',
          elements: [
            {
              id: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
              type: 'text',
              name: 'text',
              label: 'Text',
              conditionallyShow: false,
              isDataLookup: false,
              isElementLookup: false,
            },
          ],
        },
        {
          ...lookupButtonElement,
          isDataLookup: true,
          dataLookupId: 1,
          isElementLookup: false,
          elementDependencies: [
            {
              elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
              type: 'REPEATABLE_SET_FORM_ELEMENT',
              elementDependency: {
                elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
                type: 'FORM_ELEMENT',
              },
            },
          ],
        },
      ],
    })
    expect(result.elements).toEqual([
      {
        type: 'repeatableSet',
        id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
        name: 'My_Repeatable_Set',
        label: 'My Repeatable Set',
        addSetEntryLabel: 'Add an entry',
        removeSetEntryLabel: 'Remove this entry',
        conditionallyShow: false,
        readOnly: false,
        elements: [
          {
            id: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
            type: 'text',
            name: 'text',
            label: 'Text',
            conditionallyShow: false,
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            required: false,
          },
        ],
      },
      {
        ...lookupButtonElement,
        isDataLookup: true,
        dataLookupId: 1,
        isElementLookup: false,
        conditionallyShow: false,
        elementDependencies: [
          {
            elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
            type: 'REPEATABLE_SET_FORM_ELEMENT',
            elementDependency: {
              elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
              type: 'FORM_ELEMENT',
            },
          },
        ],
      },
    ])
  })

  test('should handle "FORM_FORM_ELEMENT" type', () => {
    const result = validateFormThrowError({
      ...form,
      elements: [
        {
          type: 'form',
          id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
          name: 'My_Form',
          formId: 1,
        },
        {
          ...lookupButtonElement,
          isDataLookup: true,
          dataLookupId: 1,
          isElementLookup: false,
          elementDependencies: [
            {
              elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
              type: 'FORM_FORM_ELEMENT',
              elementDependency: {
                elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
                type: 'FORM_ELEMENT',
              },
            },
          ],
        },
      ],
    })
    expect(result.elements).toEqual([
      {
        type: 'form',
        id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
        name: 'My_Form',
        formId: 1,
        conditionallyShow: false,
      },
      {
        ...lookupButtonElement,
        isDataLookup: true,
        dataLookupId: 1,
        isElementLookup: false,
        conditionallyShow: false,
        elementDependencies: [
          {
            elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
            type: 'FORM_FORM_ELEMENT',
            elementDependency: {
              elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
              type: 'FORM_ELEMENT',
            },
          },
        ],
      },
    ])
  })

  test('should handle nesting of all types', () => {
    const result = validateFormThrowError({
      ...form,
      elements: [
        {
          type: 'form',
          id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
          name: 'My_Form',
          formId: 1,
        },
        {
          ...lookupButtonElement,
          isDataLookup: true,
          dataLookupId: 1,
          isElementLookup: false,
          elementDependencies: [
            {
              elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
              type: 'FORM_FORM_ELEMENT',
              elementDependency: {
                elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
                type: 'REPEATABLE_SET_FORM_ELEMENT',
                elementDependency: {
                  elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
                  type: 'FORM_ELEMENT',
                },
              },
            },
          ],
        },
      ],
    })
    expect(result.elements).toEqual([
      {
        type: 'form',
        id: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
        name: 'My_Form',
        formId: 1,
        conditionallyShow: false,
      },
      {
        ...lookupButtonElement,
        isDataLookup: true,
        dataLookupId: 1,
        isElementLookup: false,
        conditionallyShow: false,
        elementDependencies: [
          {
            elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
            type: 'FORM_FORM_ELEMENT',
            elementDependency: {
              elementId: '3A1916B9-B05A-46B5-A128-93639DE2D8ED',
              type: 'REPEATABLE_SET_FORM_ELEMENT',
              elementDependency: {
                elementId: '1F07BBED-2709-44F7-AC91-2FFCBD803B6D',
                type: 'FORM_ELEMENT',
              },
            },
          },
        ],
      },
    ])
  })
})
