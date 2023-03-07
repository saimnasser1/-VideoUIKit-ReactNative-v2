import React, { useContext } from 'react';
import {View, Dimensions, Platform} from 'react-native';

import { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import PropsContext from './PropsContext';
import { UidInterface } from './RtcContext';
import styles from './Style';
import LocalControls from './Controls/LocalControls';

const LocalView = RtcLocalView.SurfaceView;
const RemoteView = RtcRemoteView.SurfaceView;
const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

interface MaxViewInterface {
  user: UidInterface;
}
/**
 * MaxVideoView takes in a user and renders the video
 */
const MaxVideoView: React.FC<MaxViewInterface> = props => {
  const { styleProps } = useContext(PropsContext);
  const { maxViewStyles, videoMode } = styleProps || {};
  const renderModeProp = videoMode?.max;

  return props.user.uid === 'local' ? (
    <>
   {props?.showVideo ? 
   <>
      <LocalView
        style={[{ ...styles.fullView, ...(maxViewStyles as object) }]}
        renderMode={renderModeProp ? renderModeProp : VideoRenderMode.Hidden}
      />
    </>
    :
    <>
      <View  style={{ 
          height: Platform.OS === 'ios'? height * 0.975 : height * 0.95,
          width: width,
          position:'absolute',
          zIndex: 7,
          backgroundColor: 'black'
          }}>
        <LocalControls
          encounterData={props.encounterData}
          showButton={props.showButton}
          renderMessageButton={props.renderMessageButton}
          showBottomButtons={props.showBottomButtons}
          patientCard={props.patientCard}
          setShowVideo={props.setShowVideo}
          showVideo={props.showVideo}
          />
      </View>
    </>}
    </>
  ) : (
    <>
      <RemoteView
        style={{ ...styles.fullView, ...(maxViewStyles as object) }}
        uid={props.user.uid as number}
        renderMode={renderModeProp ? renderModeProp : VideoRenderMode.Hidden}
      />
    </>
  );
};

export default MaxVideoView;
