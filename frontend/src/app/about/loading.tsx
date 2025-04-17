import { Box} from '@mui/material';
import LoadingComponent from '@/components/Loading/LoadingComponent';
export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'blur',
                position: 'absolute',
                width: '100%',
            }}
        >
            <LoadingComponent />
        </Box>
    );
}
