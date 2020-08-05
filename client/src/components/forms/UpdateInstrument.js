import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Input, Button } from 'antd'
import { UPDATE_INSTRUMENT } from '../../queries'

const UpdateInstrument = (props) => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [brand, setBrand] = useState(props.brand)
  const [type, setType] = useState(props.type)
  const [price, setPrice] = useState(props.price)
  const [artistId, setArtistId] = useState(props.artistId)
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values) => {
    const { year, brand, type, price, artistId } = values
    updateInstrument({
      variables: {
        id,
        year,
        brand,
        type,
        price,
        artistId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addInstrument: {
          __typename: 'Instrument',
          id,
          year,
          brand,
          type,
          price,
          artistId,
        },
      },
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        props.updateStateVariable('year', value)
        setYear(value)
        break
      case 'brand':
        props.updateStateVariable('brand', value)
        setBrand(value)
        break
      case 'type':
        props.updateStateVariable('type', value)
        setType(value)
        break
      case 'price':
        props.updateStateVariable('price', value)
        setPrice(value)
        break
      case 'artistId':
        props.updateStateVariable('artistId', value)
        setArtistId(value)
        break
      default:
        break
    }
  }

  return (
    <Form
      form={form}
      name='update-instrument-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        brand: brand,
        type: type,
        price: price,
        artistId: artistId,
      }}
      size='large'
    >
      <Form.Item
        name='year'
        rules={[
          {
            required: true,
            message: 'Please input the year of the instrument!',
          },
        ]}
      >
        <Input placeholder='i.e. 2018' />
      </Form.Item>
      <Form.Item
        name='brand'
        rules={[
          { required: true, message: 'Please input brand of the instrument!' },
        ]}
      >
        <Input placeholder='i.e. Yamaha' />
      </Form.Item>
      <Form.Item
        name='type'
        rules={[
          { required: true, message: 'Please input the type of instrument!' },
        ]}
      >
        <Input placeholder='i.e. Keyboard' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[
          {
            required: true,
            message: 'Please input the price of the instrument!',
          },
        ]}
      >
        <Input placeholder='i.e. 800' />
      </Form.Item>
      <Form.Item
        name='artistId'
        rules={[{ required: true, message: 'Please input the artist id!' }]}
      >
        <Input placeholder='i.e. 2' />
      </Form.Item>
      <Form.Item shouldUpdate={true} style={{ textAlign: 'center' }}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Instrument
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateInstrument
