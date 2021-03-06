import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tagDetail(id: $id) {
      tagID
      createTime
      lastUpdateTime
      location {
        geoInfo
      }
      description
      imageUrl
    }
  }
`

const generateTime = (time) => {
  console.log(typeof time)
  const times = time.split(' ')
  var month = 0
  switch (times[1]) {
    case 'Jan':
      month = 1
      break
    case 'Feb':
      month = 2
      break
    case 'Mar':
      month = 3
      break
    case 'Apr':
      month = 4
      break
    case 'May':
      month = 5
      break
    case 'Jun':
      month = 6
      break
    case 'Jul':
      month = 7
      break
    case 'Aug':
      month = 8
      break
    case 'Sep':
      month = 9
      break
    case 'Oct':
      month = 10
      break
    case 'Nov':
      month = 11
      break
    case 'Dec':
      month = 12
      break
    default:
      month = 0
      break
  }
  return `${times[3]}-${month}-${times[2]} ${times[4]}`
}

function useTagDetail(id) {
  const { loading, data: { tagDetail = {} } = {} } = useQuery(
    GET_TAG_DETAIL_QUERY,
    {
      variables: { id }
    }
  )
  if (!loading) {
    const detail = {
      ...tagDetail,
      newCreateTime: generateTime(tagDetail.createTime),
      newLastUpdateTime: generateTime(tagDetail.lastUpdateTime)
    }
    return detail
  }

  // console.log(typeof tagDetail.createTime)
  return null
}

export default useTagDetail
