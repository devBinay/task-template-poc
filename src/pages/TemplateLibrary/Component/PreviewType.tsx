import { Box, Button, MenuItem, TextField } from "@mui/material";
import Select from '@mui/material/Select';
import SvgIcon from "@/core/components/Icon";

const renderAnswer = ({ type, answer}) => {
    switch (type) {
      case "Textfield":
        return (
          <TextField
            size="small"
            value={answer}
            placeholder="Enter answer"
            disabled={true}
          />
        );

      case "Dropdown":
        return (
          <Select size="small" value={answer} disabled={true}  sx={{ minWidth: "180px" }} >
             <MenuItem value={answer}>{answer}</MenuItem>
          </Select>
        );

       case "Multiline-Textfield": 
        return (
            <TextField
                id="outlined-multiline-static"
                label=""
                multiline
                rows={2}
                disabled={true}
                defaultValue={answer}
                InputProps={{
                    sx: {
                        "& MuiOutlinedInput-root": {
                            padding: "6px",
                        },
                    },
                }}
            />
        )
      default:
        return <Box>{answer}</Box>;
    }
};

export const renderPreviewHeading = ({heading, btn1visible="false", btn1Name, btn2visible="false", btn2Name }) => {
    return <Box fontWeight={500} display='flex' alignItems='center' justifyContent='space-between' width="100%">
                <Box fontSize='18px' fontWeight={500}> {heading} </Box>
                <Box display="flex" gap="6px">
                  {btn1visible && <Button
                    startIcon={
                      <SvgIcon component={btn1Name} size={20} fill="#5C5C5C" />
                    }
                    sx={{ borderColor: '#DCDCDC', padding: '6px', minWidth: 'auto' }}
                    variant='outlined' 
                    className='more-options-button'
                  ></Button>}
                  {btn2visible && <Button 
                    startIcon={
                      <SvgIcon component={btn2Name} size={20} fill="#5C5C5C" />
                    }
                    sx={{ borderColor: '#DCDCDC', padding: '6px', minWidth: 'auto' }}
                    variant='outlined'
                  ></Button>}
                </Box>
            </Box>
}


export  const renderPreviewPopupRow = ({ index, text, type, answer, mandatory }) => {
    return <Box sx={{ padding: "16px", borderBottom: "1px solid #E7E7E7", display: "flex", gap: "10px"}}>
        <Box display="flex" width="70%">
          {mandatory && <Box color="red">*</Box>}
          <Box>{index}. {text}</Box>
        </Box>
        <Box>
            {renderAnswer({ type, answer})}
        </Box>
    </Box>
}