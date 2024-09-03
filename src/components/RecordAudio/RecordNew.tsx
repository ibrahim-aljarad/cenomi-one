import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType
} from 'react-native-audio-recorder-player';
import type { AudioSet, PlayBackType, RecordBackType } from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

import type { ReactElement } from 'react';
import CustomButton from './CustomButton';
import { SCREEN_WIDTH } from '../../constant';
import CustomText from '../CustomText';

interface State {
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

class RecordAudioNew extends Component<any, State> {
  private path = Platform.select({
    ios: undefined,
    android: undefined

    // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
    // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
    // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
    // ios: 'hello.m4a',
    // android: `${this.dirs.CacheDir}/hello.mp3`,
  });

  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00'
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }

  public render(): ReactElement {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) * (SCREEN_WIDTH - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <View style={styles.container}>
        <CustomText styling={styles.titleTxt}>Audio Recorder Player</CustomText>
        <CustomText styling={styles.txtRecordCounter}>{this.state.recordTime}</CustomText>
        <View style={styles.viewRecorder}>
          <CustomButton
            buttonText="Record"
            btnContainerStyle={styles.buttonStyle}
            handleOnSubmit={this.onStartRecord}
          />
          <CustomButton
            btnContainerStyle={styles.buttonStyle}
            buttonText="Pause"
            handleOnSubmit={this.onPauseRecord}
          />
          <CustomButton
            btnContainerStyle={styles.buttonStyle}
            buttonText="Resume"
            handleOnSubmit={this.onResumeRecord}
          />
          <CustomButton
            btnContainerStyle={styles.buttonStyle}
            buttonText="Stop"
            handleOnSubmit={this.onStopRecord}
          />
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity style={styles.viewBarWrapper} onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, { width: playWidth }]} />
            </View>
          </TouchableOpacity>
          <CustomText>
            {this.state.playTime} / {this.state.duration}
          </CustomText>
          <View style={styles.viewRecorder}>
            <CustomButton
              buttonText="Play"
              handleOnSubmit={this.onStartPlay}
              btnContainerStyle={styles.buttonStyle}
            />
            <CustomButton
              buttonText="Pause"
              btnContainerStyle={styles.buttonStyle}
              handleOnSubmit={this.onPausePlay}
            />
            <CustomButton
              btnContainerStyle={styles.buttonStyle}
              buttonText="Resume"
              handleOnSubmit={this.onResumePlay}
            />
            <CustomButton
              buttonText="Stop"
              handleOnSubmit={this.onStopPlay}
              btnContainerStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
    );
  }

  private onStatusPress = (e: any): void => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);

    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) * (SCREEN_WIDTH - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  private onStartRecord = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS
    };

    console.log('audioSet', audioSet);

    const uri = await this.audioRecorderPlayer.startRecorder(this.path, audioSet);

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      // console.log('record-back', e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      });
    });
    console.log(`uri: ${uri}`);
  };

  private onPauseRecord = async (): Promise<void> => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  private onResumeRecord = async (): Promise<void> => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  private onStopRecord = async (): Promise<void> => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0
    });
    console.log(result);
  };

  private onStartPlay = async (): Promise<void> => {
    console.log('onStartPlay', this.path);

    try {
      const msg = await this.audioRecorderPlayer.startPlayer(this.path);

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await this.audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
        this.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
        });
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };

  private onPausePlay = async (): Promise<void> => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onResumePlay = async (): Promise<void> => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  private onStopPlay = async (): Promise<void> => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}

export default RecordAudioNew;
