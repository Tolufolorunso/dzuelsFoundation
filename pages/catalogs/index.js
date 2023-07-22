import CatalogFunctionBtns from '@/components/cataloging/catalog-function-btns'
import Container from '@/components/layout/container'
import Link from 'next/link'

import BookList from '@/components/cataloging/book-list'
import { useRouter } from 'next/router'

const data = [
  {
    barcode: 800123,
    title: 'The quest for aztec gold',
    author: 'Jon',
    classification: 35,
    controlNumber: '200.3',
  },
  {
    barcode: 800124,
    title: 'The quest for aztec gold',
    author: 'Cersei',
    classification: 42,
    controlNumber: '200.3',
  },
  {
    barcode: 800125,
    title: 'The quest for aztec gold',
    author: 'Jaime',
    classification: 45,
    controlNumber: '200.3',
  },
  {
    barcode: 800126,
    title: 'The quest for aztec gold',
    author: 'Arya',
    classification: 16,
    controlNumber: '200.3',
  },
  {
    barcode: 800127,
    title: 'The quest for aztec gold',
    author: 'Daenerys',
    classification: null,
    controlNumber: '200.3',
  },
  {
    barcode: 800121,
    title: 'The quest for aztec gold',
    author: null,
    classification: 300,
    controlNumber: '200.3',
  },
  {
    barcode: 800128,
    title: 'The quest for aztec gold',
    author: 'Ferrara',
    classification: 400,
    controlNumber: '200.3',
  },
  {
    barcode: 800129,
    title: 'The quest for aztec gold',
    author: 'Rossini',
    classification: 444,
    controlNumber: '200.3',
  },
  {
    barcode: 800122,
    title: 'The quest for aztec gold',
    author: 'Harvey',
    classification: 800,
    controlNumber: '200.3',
  },
]

function CatalogPage() {
  const router = useRouter()
  function onCellClickHandler(data) {
    router.push(`/catalogs/${data.row.barcode}`, data.row)
  }

  return (
    <Container>
      <CatalogFunctionBtns />
      <BookList rows={data} onCellClickHandler={onCellClickHandler} />
    </Container>
  )
}

export default CatalogPage
