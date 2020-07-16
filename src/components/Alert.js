import React from 'react'

import MuiAlert from '@material-ui/lab/Alert'

export default (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}