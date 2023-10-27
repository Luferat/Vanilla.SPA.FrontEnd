
            <!--PWA-FACTORY.COM-->
            <!--ADD THE FILES IN YOUR ROOT FOLDER & INCLUDE THIS IN YOUR HTML HEAD-->
                <link rel="manifest" href="manifest.json">
                <script>
                    if ('serviceWorker' in navigator) {
                        window.addEventListener("load", () => {
                            navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                                console.log('ServiceWorker registered');
                              }).catch(function(err) {
                                console.log('ServiceWorker error: ', err);
                              });
                        })
                    }
                </script>    
            <!--PWA-FACTORY.COM-->
            
