export function dimensionsToStyleObject(dimensions: number[]){
    if(dimensions[0]/dimensions[1] === 1){
        return { width: '100%'}
    }else if(dimensions[0]/dimensions[1] > 1){
        return {width: '100%', marginTop: `${(dimensions[0]-dimensions[1])/dimensions[0]*50}%`, marginBottom: `${(dimensions[0]-dimensions[1])/dimensions[0]*50}%`}
    }else if(dimensions[0]/dimensions[1] < 1){
        return {width: `${dimensions[0]/dimensions[1]*100}%`, marginLeft: `${(dimensions[1]-dimensions[0])/dimensions[1]*50}%`, marginRight: `${(dimensions[1]-dimensions[0])/dimensions[1]*50}%`}
    }
}