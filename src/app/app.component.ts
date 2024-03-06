import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../environments/environment";
import {Injectable} from '@angular/core';
import {VoiceRecognitionService} from "./service/voice-recognition.service";
import {TextToSpeechService} from "./service/text-to-speech.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

@Injectable({
    providedIn: 'root'
})

export class AppComponent implements OnInit {

    public conversation = '';
    public voiceRecognitionState = 0;
    public voiceButtonColor = 'primary'
    private messages = [{'role': 'system', 'content': 'Vous êtes une IA très serviable'}];

    constructor(private http: HttpClient, public voiceRecognition: VoiceRecognitionService, public textToSpeech: TextToSpeechService) {
    }

    ngOnInit(): void {

        // microphone authorization
        navigator.mediaDevices.getUserMedia({audio: true});
        // init recognition system
        this.voiceRecognition.init();
        // init textToSpeech system
        this.textToSpeech.init();
    }

    voiceRecognitionSwitch() {
        if (this.voiceRecognitionState == 0) {
            this.voiceRecognition.start();
            this.voiceRecognitionState = 1;
            this.voiceButtonColor = 'warn'
        } else {
            this.voiceRecognition.stop();
            this.voiceRecognitionState = 0;
            this.voiceButtonColor = 'primary'
            this.callIA(this.voiceRecognition.text);
            this.voiceRecognition.text = '';
            this.voiceRecognition.tempWords = '';
        }
    }
    
    addResponse(response: string, toVoice: boolean = true) {
      this.messages.push({'role': 'assistant', 'content': response});
      let htmlResponse = response.replace(/\\n/g, '<br/>');
      if (toVoice) {
        this.textToVoice(htmlResponse);
      }
      this.conversation = this.conversation.concat('<br /><b>IA</b> : ' + htmlResponse);
  }

  addImage(blob: Blob) {
    this.addResponse('<img src="'+URL.createObjectURL(blob)+'" />', false);
  }

  textToVoice(text) {
      this.textToSpeech.say(text);
  }

    /**
     * https://platform.openai.com/docs/guides/chat/introduction
     * @param text
     */
    callIA(text) {

      if (text.startsWith('dessine-moi')) {
        this.generateImage(text.substring('dessine-moi '.length));
      } else if (text.startsWith('dis-moi')) {
        this.generateText(text.substring('dis-moi '.length));
      }

        
/*
        this.http.post<any>('https://api.openai.com/v1/chat/completions', JSON.stringify(requestData), {headers: headers})
            .subscribe(data => {
                this.addResponse(data.choices[0].message.content);
            },
            error => {
               console.log(error);
               this.addResponse(error.message);
            });
*/

      // image sample
      
/*
      let headers = new HttpHeaders({
        // todo à complèter
      });

      // need to push all the conversation each time to keep the context
      this.messages.push({'role': 'user', 'content': text});
      let requestData = '' // todo à complèter

        this.http.post<any>('', JSON.stringify(requestData), {headers: headers, observe: 'response', responseType: 'blob' as 'json'})
          .subscribe(data => {
              this.addResponse('<img src="'+URL.createObjectURL(data.body)+'" />', false);
            },
            error => {
              console.log(error);
              this.addResponse(error.message);
            });
*/
    }

    
    private generateText(text): void {
      this.conversation = this.conversation.concat('<br /><b>Me</b> : ' + text);

        // text sample

        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.openAIApiKey}`
        });

// Assuming this.messages and this.http are already defined in your service
this.messages.push({'role': 'user', 'content': text});

// Constructing the request data according to Hugging Face's API expectations
let requestData = {
  inputs: text,
  // Add any additional parameters required by Mistral here
  // For example, options for temperature, max_length, etc.
};

const modelEndpoint = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

this.http.post<any>(modelEndpoint, JSON.stringify(requestData), {headers: headers})
    .subscribe(data => {
        // Assuming the response structure includes a 'choices' array
        // This might need adjustment based on the actual response structure from Mistral
        this.addResponse(data[0].generated_text);
    },
    error => {
       console.error(error);
       this.addResponse(error.message);
    });

    }
  
    private generateImage(text): void {
      // Headers for the request
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.openAIApiKey}`
  });

  // Request data
  const requestData = {
    inputs: text,
    // Include any additional parameters as per model requirements
  };

  // API call to Stable Diffusion XL
  this.http.post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', JSON.stringify(requestData), {headers: headers, observe: 'response', responseType: 'blob' as 'json'})
    .subscribe(response => {
      // Use the addImage function to display the generated image
      this.addImage(response.body as Blob);
        }, error => {
      console.error(error);
      // Handle error
      this.addResponse(error.message); // Assuming you have a method to display errors or messages
    });















    }
}
