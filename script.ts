import Joi from 'joi'

const elementSchema = Joi.object({
  type: Joi.string().required().valid(['text', 'number']),
})
  .when(
    Joi.object({
      type: 'text',
    }),
    {
      then: Joi.object({
        id: Joi.string().guid().required().label('Form Element - Id'),
        defaultValue: Joi.string(),
        placeholderValue: Joi.string(),
      }),
    },
  )
  .when(
    Joi.object({
      type: 'number',
    }).unknown(),
    {
      then: Joi.object({
        id: Joi.string().guid().required().label('Form Element - Id'),
        defaultValue: Joi.number(),
        min: Joi.number(),
        max: Joi.number(),
      }),
    },
  )

const fn = () => {
  const element = {
    type: 'number',
    defaultValue: 5,
    min: 2,
  }

  const result = Joi.validate(element, elementSchema)
  console.log(result)
}

fn()
