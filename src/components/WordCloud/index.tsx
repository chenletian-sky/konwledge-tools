import axios from 'axios';
import { data } from 'jquery';
import React, {Component} from 'react';
// import wordCloud from 'wordcloud'
import ReactWordcloud from 'react-wordcloud';

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
      axios.get('/public/data/300class_word_cloud_data.json').then( (response)=>{
        let data = response.data
        // console.log(data['0'])
        data = data['0']
        let afterdata = []
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
        return (
            <div id="wordCloudChart" style={{width:"100%",height:"100%"}}>
              
              {/* <div style={{width:"50%",height:"50%"}}> */}
                <ReactWordcloud words={this.state.words === []? [] : this.state.words} ></ReactWordcloud>
              {/* </div> */}
              
            </div>
        )
    }
}
export default WordCloud;