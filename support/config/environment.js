export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        }
    },
    options: {
        smokeThresholdsLogin: {
            vus: 1,
            duration: '5s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },

        loadThresholdsLogin: {
            // stages: [
            //     {duration: '10s', target: 200},
            //     {duration: '10s', target: 300},
            //     {duration: '10s', target: 500},
            //     {duration: '10s', target: 1000},
            //     {duration: '10s', target: 500},
            //     {duration: '10s', target: 300},
            //     {duration: '10s', target: 200},
            //     {duration: '10s', target: 0}
            // ],
            vus: 1,
            duration: '5s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },

        stressThresholdsLogin: {
            // stages: [
            //     { duration: '30s', target: 1000 },
            //     { duration: '3m', target: 1000 },
            //     { duration: '5s', target: 0 },
            // ],
            vus: 1,
            duration: '5s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },
        fluxoThresholds: {
            vus: 1,
            duration: '1s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<5000'],
                checks: ['rate>0.9']
            }
        },
///////////////////////////////////////////////////////////////////////

        loadThresholds: {
            vus: 1,
            duration: '5s',
            // vus: 400,
            // duration: '30s',
            setupTimeout: '300s',
            teardownTimeout: '300s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },
        stressThresholds: {
            vus: 1,
            duration: '5s',
            // vus: 200,
            // duration: '2m',
            setupTimeout: '300s',
            teardownTimeout: '300s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },
        smokeThresholds: {
            vus: 1,
            duration: '5s',
            // vus: 1,
            // duration: '10s',
            setupTimeout: '300s',
            teardownTimeout: '300s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01'],
                http_req_waiting: ['p(95)<1500'],
                http_req_connecting: ['p(95)<500'],
                iteration_duration: ['p(95)<2000'],
                checks: ['rate>0.9']
            }
        },

///////////////////////////////////////////////////////////////////////
        
        cemUsuarios1min: {
            vus: 100,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 100},
                {duration: '10s', target: 0}
            ]
        },
        duzentosUsuarios1min: {
            vus: 200,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 200},
                {duration: '10s', target: 0}
            ]
        },
        trezentosUsuarios1min: {
            vus: 300,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 300},
                {duration: '10s', target: 0}
            ]
        },
        quatrocentosUsuarios1min: {
            vus: 400,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 400},
                {duration: '10s', target: 0}
            ]
        },
        quinhentosUsuarios1min: {
            vus: 500,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 500},
                {duration: '10s', target: 0}
            ]
        },
        seiscentosUsuarios1min: {
            vus: 600,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 600},
                {duration: '10s', target: 0}
            ]
        },
        setecentosUsuarios1min: {
            vus: 700,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            },
            stages: [
                {duration: '50s', target: 700},
                {duration: '10s', target: 0}
            ]
        },
        umUsuarioUmSegundo: {
            vus: 1,
            duration: '1s',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.01']
            }
        }
    }
}