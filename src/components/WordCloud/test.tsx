import axios from 'axios';
import { data } from 'jquery';
import React, {Component} from 'react';
// import wordCloud from 'wordcloud'
import ReactWordcloud, { MinMaxPair, Optional, Options } from 'react-wordcloud';
import { PATH } from '../../types/actionTypes';

type WordCloudDataType = Array<{
  text:string,
  value:number
}>

interface WordCloudProps {

}

interface WordCloudState {
  words:any
}
class WordCloud extends Component <WordCloudProps, WordCloudState>{
    public constructor(props : WordCloudProps) {
        super(props)
        this.state={
          words:[]
        }
    }

    public componentDidMount(){
      axios.get(`${PATH}/get_wordCloudData`,{withCredentials:true}).then( (response)=>{
      // axios.get(`${PATH}/public/data/3000class_word_cloud_data.json`,{withCredentials:true}).then( (response)=>{  
        // let data = response
        // console.log('wordCloud',response)
        let {data} = response.data
        console.log("testCloud",data)
        data = data['0']
        console.log("wordCloudData",data)
        let afterdata:WordCloudDataType = []
        for(let i=0;i<data.length;i++){
          afterdata.push({
            "text":data[i]['name'],
            "value":data[i]['value']})
        }
        
        this.setState({
          words:afterdata
        })
        // console.log(afterdata)
        // wordCloud(document.getElementById('wordCloudChart') as any, { list: afterdata } );
      },(error)=>{
        console.log(error)
      })
    }

    public render() : JSX.Element {
        const callbacks = {
          getWordColor: (word: { value: number; }) => {
            return 'rgb(' + [
                              Math.round(Math.random() * 160),
                              Math.round(Math.random() * 160),
                              Math.round(Math.random() * 160)
                          ].join(',') + ')';
          },
          onWordClick: console.log,
          onWordMouseOver: console.log,
          getWordTooltip: (word: { text: any; value: number; }) => `${word.text} (${word.value}) 
          
          `,
        }
        const options = {
          rotations: 2,
          rotationAngles: [-90, 0],
          fontSizes:[8,60],
          fontFamily:"SimHei"
        };
        // const size = [600, 400] ;
        return (
            <div id="wordCloudChart" style={{width:"100%",height:"100%",top:'100px'}}>
              
              {/* <div style={{width:"50%",height:"50%"}}> */}
                <ReactWordcloud 
                  words={this.state.words === []? [] : this.state.words}
                  callbacks={callbacks}
                  // size={[]}
                  options={options as Optional<Options> }
                  // size={size as MinMaxPair}
                  ></ReactWordcloud>
              {/* </div> */}
              
            </div>
        )
    }
}
export default WordCloud;