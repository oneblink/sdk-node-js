import { formSchema, elementSchema } from '../src/lib/forms-schema'
import { validateWithFormSchema } from '../src/lib/forms-validation'
import { FormTypes } from '@oneblink/types'

describe('Valid Form Schema with Pages', () => {
  const result = formSchema.validate({
    id: 1,
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
          secret: 'abc123',
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
            id: '8788a2ea-a108-4362-bc37-4bf1f9d64b97',
            name: 'file',
            label: 'file',
            type: 'file',
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
        ],
      },
    ],
  })

  test('should not return an error', () => {
    expect(result.error).toBe(undefined)
  })

  test('should default "readOnly" to "false" for all elements', () => {
    result.value.elements[0].elements.forEach(
      (element: FormTypes.FormElement) => {
        if (
          element.type === 'form' ||
          element.type === 'infoPage' ||
          element.type === 'image' ||
          element.type === 'html' ||
          element.type === 'heading'
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
    id: 1,
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
          secret: 'abc123',
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
        element.type === 'heading'
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
      id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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
    id: 1,
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

test('should error if repeatableSet type element min or max entries is less then 0', () => {
  const { error } = formSchema.validate(
    {
      id: 1,
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

test('should error if page element has child page element', () => {
  const { error } = formSchema.validate(
    {
      id: 1,
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
    '"elements[0].elements[0].type" must be one of [autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, file, files, form, geoscapeAddress, heading, html, image, infoPage, location, number, pointAddress, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should error if page element has no elements', () => {
  const { error } = formSchema.validate(
    {
      id: 1,
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
      id: 1,
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
    '"elements[0].type" must be one of [autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, file, files, form, geoscapeAddress, heading, html, image, infoPage, location, number, pointAddress, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should allow multiple pages', () => {
  const { error } = formSchema.validate(
    {
      id: 1,
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
      id: 1,
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
      id: 1,
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
    '"elements[0].type" must be one of [autocomplete, barcodeScanner, boolean, bsb, calculation, camera, captcha, checkboxes, civicaNameRecord, civicaStreetName, compliance, date, datetime, draw, email, file, files, form, geoscapeAddress, heading, html, image, infoPage, location, number, pointAddress, radio, repeatableSet, section, select, summary, telephone, text, textarea, time]',
  )
})

test('should error if image element does not have a default value', () => {
  const { error } = formSchema.validate(
    {
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
  describe('when dynamic', () => {
    test('valid when dynamicOptionSetId is provided', () => {
      const result = formSchema.validate({
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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

      expect(error).toBe(undefined)
      expect(value.elements[0].optionsType).toBe('CUSTOM')
    })
    test('valid when options are provided', () => {
      const result = formSchema.validate({
        id: 1,
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
        id: 1,
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

describe('PDF submission event', () => {
  test('should allow PDF submission event with email address', () => {
    const submissionEvents = [
      {
        type: 'PDF',
        isDraft: false,
        conditionallyExecute: false,
        requiresAllConditionallyExecutePredicates: false,
        configuration: {
          email: 'developers@oneblink.io',
          excludedElementIds: [],
          emailTemplate: {
            id: 1,
            mapping: [
              {
                mustacheTag: 'submissionId',
                type: 'SUBMISSION_ID',
              },
              {
                mustacheTag: 'firstName',
                type: 'FORM_ELEMENT',
                formElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
              },
              {
                mustacheTag: 'submissionId',
                type: 'TEXT',
                text: 'This is the text',
              },
            ],
          },
        },
      },
    ]
    const { error, value } = formSchema.validate(
      {
        id: 1,
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
        id: 1,
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
        id: 1,
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
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )
    expect(error?.details[0].message).toBe(
      '"submissionEvents[0].configuration.email" does not match any of the allowed types',
    )
  })
  test('should disallow PDF submission event with email template mapping referencing element that does not exist', () => {
    const run = () =>
      validateWithFormSchema({
        id: 1,
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
                    mustacheTag: 'firstName',
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
        id: 1,
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
            configuration: {
              url: 'https://google.com',
              secret: 'abc123',
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
        id: 1,
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
        id: 1,
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
  })
  test('should error TRIM submission event not passing environmentId', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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
})

describe('SCHEDULING submission event', () => {
  test('should allow SCHEDULING submission event', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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
        submissionEvents: [
          {
            type: 'SCHEDULING',
            configuration: {
              nylasAccountId: 'string',
              nylasSchedulingPageId: 1,
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
      validateWithFormSchema({
        id: 1,
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
            type: 'SCHEDULING',
            configuration: {
              nylasAccountId: 'string',
              nylasSchedulingPageId: 1,
              nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.nameElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements"',
    )
  })
  test('should error SCHEDULING submission event if "nameElementId" references an element that is a "text" element', () => {
    expect(() =>
      validateWithFormSchema({
        id: 1,
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
        submissionEvents: [
          {
            type: 'SCHEDULING',
            configuration: {
              nylasAccountId: 'string',
              nylasSchedulingPageId: 1,
              nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.nameElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) references a form element that is not a "text" element.',
    )
  })
  test('should error SCHEDULING submission event if emailElementId does not exist', () => {
    expect(() =>
      validateWithFormSchema({
        id: 1,
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
            type: 'SCHEDULING',
            configuration: {
              nylasAccountId: 'string',
              nylasSchedulingPageId: 1,
              emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.emailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements"',
    )
  })
  test('should error SCHEDULING submission event if "emailElementId" references an element that is an "email" element', () => {
    expect(() =>
      validateWithFormSchema({
        id: 1,
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
        submissionEvents: [
          {
            type: 'SCHEDULING',
            configuration: {
              nylasAccountId: 'string',
              nylasSchedulingPageId: 1,
              emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.emailElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) references a form element that is not an "email" element.',
    )
  })
})
describe('CIVICA_CRM submission event', () => {
  test('should allow CIVICA_CRM submission event', () => {
    const { error, value } = formSchema.validate(
      {
        id: 1,
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
        id: 1,
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
      validateWithFormSchema({
        id: 1,
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
      id: 1,
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
          type: 'BPOINT',
          configuration: {},
        },
      ],
    })
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.elementId" is required',
    )
  })
  test('should error for BPOINT submission event not passing "environmentId"', () => {
    const { error } = formSchema.validate({
      id: 1,
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
          type: 'BPOINT',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.environmentId" is required',
    )
  })
  test('should allow BPOINT submission event', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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

        submissionEvents: [
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

describe('WESTPAC_QUICK_WEB submission event', () => {
  test('should error for WESTPAC_QUICK_WEB submission event not passing "elementId"', () => {
    const { error } = formSchema.validate({
      id: 1,
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
          type: 'WESTPAC_QUICK_WEB',
          configuration: {},
        },
      ],
    })
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.elementId" is required',
    )
  })
  test('should error for WESTPAC_QUICK_WEB submission event not passing "environmentId"', () => {
    const { error } = formSchema.validate({
      id: 1,
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
          type: 'WESTPAC_QUICK_WEB',
          configuration: {
            elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
          },
        },
      ],
    })
    expect(error?.message).toContain(
      '"submissionEvents[0].configuration.environmentId" is required',
    )
  })
  test('should allow WESTPAC_QUICK_WEB submission event', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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
        submissionEvents: [
          {
            type: 'WESTPAC_QUICK_WEB',
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
        id: 1,
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

        submissionEvents: [
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

describe('CP_HCMS submission event', () => {
  test('should allow CP_HCMS submission event', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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

        submissionEvents: [
          {
            type: 'CP_HCMS',
            configuration: {
              contentTypeName: 'contenttypename-1',
              encryptedElementIds: ['b941ea2d-965c-4d40-8c1d-e5a231fc18b1'],
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
  test('should reject CP_HCMS submission event with contentType name > 40', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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
        id: 1,
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
        id: 1,
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
})

describe('Conditional Predicates', () => {
  test('should allow both OPTIONS and NUMERIC conditional types', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show via number input',
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
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'My_Multi_Select',
            label: 'My Select',
            type: 'select',
            required: false,
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
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: true,
            conditionallyShowPredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'NUMERIC',
                operator: '<',
                value: 5,
              },
              {
                elementId: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                type: 'OPTIONS',
                optionIds: ['5c82ef40-779a-46fb-8860-c9b4969518ec'],
              },
            ],
          },
        ],
        isAuthenticated: true,

        submissionEvents: [],
      },

      {
        abortEarly: false,
      },
    )
    expect(error).toBe(undefined)
  })

  test('should error if conditional predicate types are missing required values', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'My_Multi_Select',
            label: 'My Select',
            type: 'select',
            required: false,
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
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: true,
            conditionallyShowPredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'OPTIONS',
                operator: '<',
                value: 5,
              },
              {
                elementId: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                type: 'NUMERIC',
                optionIds: ['5c82ef40-779a-46fb-8860-c9b4969518ec'],
              },
            ],
          },
        ],
        isAuthenticated: true,

        submissionEvents: [],
      },
      {
        abortEarly: false,
      },
    )
    expect(error?.details[0].message).toBe(
      '"elements[2].conditionallyShowPredicates[0].optionIds" is required',
    )
    expect(error?.details[1].message).toBe(
      '"elements[2].conditionallyShowPredicates[1].operator" is required',
    )
    expect(error?.details[2].message).toBe(
      '"elements[2].conditionallyShowPredicates[1].value" is required',
    )
  })
})

describe('Data Lookup enabled', () => {
  test('should allow id for data lookup enabled type', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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
        id: 1,
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
        id: 1,
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
      id: 1,
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
            secret: 'abc123',
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
                id: 'b527bcea-dc84-477f-a5ee-d34abfec92fa',
                name: 'file',
                label: 'file',
                type: 'file',
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      isInfoPage: false,
      isMultiPage: false,
    })
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
      '"optionsType" must be one of [CUSTOM, DYNAMIC]',
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
      '"optionsType" must be one of [CUSTOM, DYNAMIC]',
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
      '"optionsType" must be one of [CUSTOM, DYNAMIC]',
    )
  })

  test('Should allow SEARCH option type for AUTOCOMPLETE element', () => {
    const { error, value } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'autocomplete',
      name: 'autocomplete',
      label: 'autocomplete',
      optionsType: 'SEARCH',
      searchUrl: 'http://search.com',
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
      searchUrl: 'http://search.com',
    })
  })

  test('Should allow searchUrl propery as a string for autocomplete when optionsType is SEARCH', () => {
    const { error, value } = elementSchema.validate({
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'autocomplete',
      name: 'autocomplete',
      label: 'autocomplete',
      optionsType: 'SEARCH',
      searchUrl: 'http://search.com',
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
      searchUrl: 'http://search.com',
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
    isDataLookup: false,
    isElementLookup: false,
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
    isDataLookup: false,
    isElementLookup: false,
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

test('should allow defaultValue for files element with "legacy" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    storageType: 'legacy',
    defaultValue: [
      {
        fileName: 'dot.png',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
      },
    ],
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue in "legacy" format for files element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'files',
    label: 'Files',
    type: 'files',
    defaultValue: [
      {
        fileName: 'dot.png',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
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

test('should allow defaultValue for camera element with "legacy" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    storageType: 'legacy',
    defaultValue:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue in "legacy" format for camera element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'camera',
    label: 'Camera',
    type: 'camera',
    defaultValue:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
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

test('should allow defaultValue for draw element with "legacy" storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    storageType: 'legacy',
    defaultValue:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow defaultValue in "legacy" format for draw element with no storageType', () => {
  const input = {
    id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
    name: 'draw',
    label: 'Draw',
    type: 'draw',
    defaultValue:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII=',
  }
  const { value, error } = elementSchema.validate(input)
  expect(error).toBeUndefined()
  expect(value?.defaultValue).toEqual(input.defaultValue)
})

test('should allow placeholderValue property for these elements', () => {
  const result = formSchema.validate({
    id: 1,
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
    id: 1,
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
    validateWithFormSchema({
      id: 1,
      name: 'Tags Form',
      formsAppEnvironmentId: 1,
      formsAppIds: [1],
      organisationId: '59cc888b8969af000fb50ddb',
      postSubmissionAction: 'FORMS_LIBRARY',
      isMultiPage: false,
      submissionEvents: [],
      elements: [],
      publishStartDate: '2020-06-21 12:00:00',
      publishEndDate: '2020-06-20 12:00:00',
    }),
  ).toThrow('Publish Start Date must be before Publish End Date')
})

describe('submission event configuration', () => {
  test('should reject if configuration is not supplied', () => {
    const { error } = formSchema.validate(
      {
        id: 1,
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

describe('submission event conditional logic', () => {
  test('should allow both OPTIONS and NUMERIC conditional types', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally execute event via number input',
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
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Select',
            label: 'Select',
            type: 'select',
            required: false,
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
            ],
          },
        ],
        isAuthenticated: true,
        submissionEvents: [
          {
            type: 'PDF',
            configuration: {
              email: 'developers@oneblink.io',
            },
            conditionallyExecute: true,
            requiresAllConditionallyExecutePredicates: true,
            conditionallyExecutePredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'NUMERIC',
                operator: '<',
                value: 5,
              },
              {
                elementId: '8e4d819b-97fa-438d-b613-a092d38c3b23',
                type: 'OPTIONS',
                optionIds: ['5c82ef40-779a-46fb-8860-c9b4969518ec'],
              },
            ],
          },
        ],
      },
      {
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
  })

  test('should set correct defaults for submission event conditional properties', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
        ],
        isAuthenticated: true,
        submissionEvents: [
          {
            type: 'PDF',
            configuration: {
              email: 'developers@oneblink.io',
              includeSubmissionIdInPdf: true,
            },
          },
        ],
      },

      {
        abortEarly: false,
      },
    )

    expect(result.value.submissionEvents[0]).toEqual({
      type: 'PDF',
      configuration: {
        email: 'developers@oneblink.io',
        includeSubmissionIdInPdf: true,
        excludedElementIds: [],
      },
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      isDraft: false,
    })
    expect(result.error).toBe(undefined)
  })

  test('should allow element with valid between conditional logic', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: false,
            conditionallyShowPredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'BETWEEN',
                min: 2,
                max: 5,
              },
            ],
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )
    expect(result.error).toBe(undefined)
  })
  test('should reject element with missing property in between conditional logic', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: false,
            conditionallyShowPredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'BETWEEN',
                min: 2,
              },
            ],
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[1].conditionallyShowPredicates[0].max" is required',
    )
  })
  test('should reject element with conditional between predicate where max is lower than min', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            minNumber: 1,
            maxNumber: 6,
            defaultValue: 3,
          },
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: true,
            requiresAllConditionallyShowPredicates: false,
            conditionallyShowPredicates: [
              {
                elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
                type: 'BETWEEN',
                min: 8,
                max: 6,
              },
            ],
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[1].conditionallyShowPredicates[0].max" must be greater than or equal to 8',
    )
  })
  test('should reject element if maxLength is less than minLength', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: 4,
            maxLength: 3,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[0].maxLength" must be greater than or equal to 4',
    )
  })

  test('should not reject element if maxLength is greater than minLength', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: 3,
            maxLength: 4,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error).toBe(undefined)
  })

  test('should reject element if defaultValue is less than minLength', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: 5,
            maxLength: 6,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toBe(
      '"elements[0].defaultValue" length must be at least 5 characters long',
    )
  })

  test('should reject element if defaultValue is greater than maxLength', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: 2,
            maxLength: 3,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toBe(
      '"elements[0].defaultValue" length must be less than or equal to 3 characters long',
    )
  })

  test('should not reject element if defaultValue is between minLength and maxLength', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            defaultValue: 'text',
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: 4,
            maxLength: 5,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error).toBe(undefined)
  })

  test('should reject element if minLength is negative', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            minLength: -4,
            maxLength: 5,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[0].minLength" must be greater than or equal to 0',
    )
  })

  test('should reject element if maxLength is negative', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'min & max text element length',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: '8e4d819b-97fa-438d-b613-a092d38c3b23',
            name: 'Text',
            label: 'Text',
            type: 'text',
            required: false,
            isDataLookup: false,
            isElementLookup: false,
            readOnly: false,
            conditionallyShow: false,
            requiresAllConditionallyShowPredicates: false,
            maxLength: -5,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[0].maxLength" must be greater than or equal to 0',
    )
  })

  test('should reject number element with decimal default value when isInteger set to true', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'Numbers',
            label: 'Numbers',
            type: 'number',
            required: false,
            defaultValue: 3.2,
            isInteger: true,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[0].defaultValue" must be an integer',
    )
  })

  test('should allow property: "includeTimestampWatermark" to be set for camera elements', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'camera',
            label: 'camera',
            type: 'camera',
            includeTimestampWatermark: true,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.value.elements[0].includeTimestampWatermark).toBe(true)
  })

  test('should strip property: "includeTimestampWatermark" if element is not of type "camera"', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'text',
            label: 'text',
            type: 'text',
            includeTimestampWatermark: true,
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.value.elements[0].includeTimestampWatermark).toBe(undefined)
  })

  test('should reject property: "includeTimestampWatermark" if it is not a boolean', () => {
    const result = formSchema.validate(
      {
        id: 1,
        name: 'conditionally show element via number input',
        description: 'string',
        formsAppEnvironmentId: 1,
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        isMultiPage: false,
        elements: [
          {
            id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            name: 'camera',
            label: 'camera',
            type: 'camera',
            includeTimestampWatermark: 'true1',
          },
        ],
        isAuthenticated: true,
      },

      {
        abortEarly: false,
      },
    )

    expect(result.error?.message).toContain(
      '"elements[0].includeTimestampWatermark" must be a boolean',
    )
  })
})

describe('Date and Time `NOW` option', () => {
  const form = {
    id: 1,
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
})

describe('Regex Custom Validation Properties', () => {
  const form = {
    id: 1,
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
    id: 1,
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
    id: 1,
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
