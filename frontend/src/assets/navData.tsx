import EqualizerIcon from '@mui/icons-material/Equalizer';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

interface INavData {
    text: string,
    icon: any,
    link: string
}

const navData = [
    {
        "text": "Scopes",
        "icon": <ChecklistIcon className="icon"/>,
        "link": "/scopes"
    },
    {
        "text": "Analysis",
        "icon": <EqualizerIcon className="icon"/>,
        "link": "/analysis"
    },
    {
        "text": "About",
        "icon": <InfoIcon className="icon"/>,
        "link": "/about"
    },
    {
        "text": "Logout",
        "icon": <LogoutIcon className="icon"/>,
        "link": "/"
    }
]

export { navData };
export type { INavData };
