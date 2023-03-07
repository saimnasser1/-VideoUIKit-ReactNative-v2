/* eslint-disable */
/**
 * @module AgoraUIKit
 */
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import RtcConfigure from './RTCConfigure';
import PropsContext, { PropsProvider, PropsInterface, layout } from './PropsContext';
import LocalControls from './Controls/LocalControls';
import GridVideo from './GridVideo';
import PinnedVideo from './PinnedVideo';
import EndCall from './Controls/Local/EndCall';
import { LocalAudioMute, LocalVideoMute, SwitchCamera } from 'agora-rn-uikit/Components';

/**
 * High level component to render the UI Kit
 * @param props {@link PropsInterface}
 */
const AgoraUIKit: React.FC<PropsInterface> = props => {
  const [showVideo, setShowVideo] = useState(true);
  const toggleVideo = () => setShowVideo(prev => !prev);
  const { styleProps, rtcProps } = useContext(PropsContext);
  const { localBtnContainer, maxViewRemoteBtnContainer } = styleProps || {};


  return (
    <PropsProvider value={props}>
      <View style={props.styleProps?.UIKitContainer}>
        <RtcConfigure>
          {props.rtcProps?.layout === layout.grid ? <GridVideo /> : 
            <PinnedVideo 
              encounterData={props.encounterData}
              showButton={props.rtcProps.layout !== layout.grid}
              renderMessageButton={props.renderMessageButton}
              showBottomButtons={props.showBottomButtons}
              patientCard={props.patientCard}
              setShowVideo={toggleVideo}
              showVideo={showVideo} />}
            <LocalControls
              encounterData={props.encounterData}
              showButton={props.rtcProps.layout !== layout.grid}
              renderMessageButton={props.renderMessageButton}
              showBottomButtons={props.showBottomButtons}
              patientCard={props.patientCard}
              setShowVideo={toggleVideo}
              showVideo={showVideo}
            />
        </RtcConfigure>
      </View>
    </PropsProvider>
  );
};

export default AgoraUIKit;
