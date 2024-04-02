   // Display a loading progress bar
   export function loading (scene:any){ 
    const progressBar = scene.add.graphics();
   const progressBox = scene.add.graphics();
   const width = scene.cameras.main.width;
   const height = scene.cameras.main.height;
   const loadingText = scene.make.text({
     x: width / 2,
     y: height / 2 - 50,
     text: 'Loading...',
     style: {
       font: '20px monospace',
       //fill: '#ffffff',
     },
   });
   loadingText.setOrigin(0.5, 0.5);

   progressBox.fillStyle(0x222222, 0.8);
   progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

   const loadingBar = scene.add.graphics();

   scene.load.on('progress', (value:any) => {
     loadingBar.clear();
     loadingBar.fillStyle(0xffffff, 1);
     loadingBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
   });

   scene.load.on('complete', () => {
     loadingBar.destroy();
     progressBox.destroy();
     loadingText.destroy();
   });
}