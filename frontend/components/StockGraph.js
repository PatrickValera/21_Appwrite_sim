import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const range = 100
const dataSample = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]
const mode = 'light'

const StockGraph = ({ color, width }) => {
    const [data, setData] = useState(dataSample)
    useEffect(() => {
        setInterval(() => {
            setData((state) => [...state, {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 2400
            },])
        }, 1000)
    }, [])
    return (
        <Box sx={{ width: '100%', height: { xs: '240px', sm: '200px', md: '300px' } }}>
            <ResponsiveContainer width={width}>
                {color &&
                    <ComposedChart
                        data={data}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={String(color)} stopOpacity={0.5} />
                                <stop offset="60%" stopColor={String(color)} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={mode === 'light' ? '#eee' : '#222'} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomToolTip />} />


                        <Line type="monotone" unit="M" strokeLinecap="round" strokeWidth={2}
                            // style={{ strokeDasharray: `40% 60%` }}
                            dataKey="uv"
                            stroke={color}
                            dot={false}
                            legendType="none"
                            isAnimationActive={false}
                        />
                        <Area isAnimationActive={false} type="monotone" stroke={0} dataKey="uv" strokeWidth={2} fillOpacity={1} fill={`url(#${color})`} />
                    </ComposedChart>}
            </ResponsiveContainer>
        </Box>

    )
}
const CustomToolTip = ({ active, payload, label }) => {
    return (
        <>
            {payload && payload.length &&
                <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 1, border: '1px solid #ddd' }}>
                    {/* <Typography variant='body2'>{label}</Typography> */}
                    <Typography variant='body2' color='success.light' className='no-select'>
                        {/* ${toLocale(payload[0].value)} */}
                        ${payload[0].value}
                    </Typography>
                </Box>
            }
        </>
    )
}
export default StockGraph