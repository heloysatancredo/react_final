import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateInstrument from '../forms/UpdateInstrument'
import RemoveArtist from '../buttons/RemoveArtist'

const getStyles = () => ({
  card: {
    width: '500px',
  },
})

const Instrument = (props) => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [brand, setBrand] = useState(props.brand)
  const [type, setType] = useState(props.type)
  const [price, setPrice] = useState(props.price)
  const [artistId, setArtistId] = useState(props.artistId)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const fullInstrument = () => {
    return `${props.year} ${props.brand} ${props.type} ${props.price}`
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

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdateInstrument
          id={id}
          brand={brand}
          type={type}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveArtist id={id} brand={brand} type={type} />,
          ]}
          style={styles.card}
        >
          {fullInstrument()}

          <Card type='inner' title='Instruments List'>
            <List grid={{ gutter: 25, column: 1 }}>
              {props.instruments &&
                props.instruments.map(
                  ({ id, year, brand, type, price, artistId }) => (
                    <List.Item key={id}>
                      <Instrument
                        id={id}
                        year={year}
                        brand={brand}
                        type={type}
                        price={price}
                        artistId={artistId}
                      />
                    </List.Item>
                  )
                )}
            </List>
          </Card>
        </Card>
      )}
    </List.Item>
  )
}

export default Instrument
